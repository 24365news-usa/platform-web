import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  "breaking",
  "politics",
  "local",
  "weather",
  "sports",
  "business",
  "entertainment",
  "technology",
  "health",
  "general",
] as const;

type Category = (typeof CATEGORIES)[number];

async function categorizeWithAI(
  title: string,
  description: string | null
): Promise<Category> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.log("No Anthropic API key, using keyword matching");
    return categorizeByKeywords(title, description);
  }

  try {
    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 50,
      messages: [
        {
          role: "user",
          content: `Categorize this news video into exactly ONE of these categories: ${CATEGORIES.join(", ")}

Title: ${title}
Description: ${description || "No description"}

Reply with ONLY the category name, nothing else.`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type === "text") {
      const category = content.text.trim().toLowerCase() as Category;
      if (CATEGORIES.includes(category)) {
        return category;
      }
    }
  } catch (error) {
    console.error("AI categorization failed:", error);
  }

  return categorizeByKeywords(title, description);
}

function categorizeByKeywords(
  title: string,
  description: string | null
): Category {
  const text = `${title} ${description || ""}`.toLowerCase();

  const keywords: Record<Category, string[]> = {
    breaking: ["breaking", "urgent", "alert", "emergency", "just in"],
    politics: [
      "president",
      "congress",
      "senate",
      "election",
      "vote",
      "governor",
      "mayor",
      "political",
      "democrat",
      "republican",
      "biden",
      "trump",
    ],
    weather: [
      "weather",
      "storm",
      "hurricane",
      "forecast",
      "rain",
      "snow",
      "temperature",
      "sunny",
      "cloudy",
      "beach",
    ],
    sports: [
      "game",
      "team",
      "score",
      "championship",
      "nfl",
      "nba",
      "mlb",
      "soccer",
      "football",
      "basketball",
      "baseball",
    ],
    local: [
      "local",
      "community",
      "neighborhood",
      "city council",
      "town",
      "county",
    ],
    business: [
      "business",
      "economy",
      "market",
      "stock",
      "company",
      "jobs",
      "unemployment",
    ],
    entertainment: [
      "movie",
      "music",
      "celebrity",
      "concert",
      "festival",
      "show",
      "actor",
    ],
    technology: ["tech", "ai", "robot", "computer", "app", "startup", "silicon"],
    health: [
      "health",
      "medical",
      "hospital",
      "doctor",
      "covid",
      "vaccine",
      "disease",
    ],
    general: [],
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some((word) => text.includes(word))) {
      return category as Category;
    }
  }

  return "general";
}

export async function POST(request: NextRequest) {
  try {
    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json(
        { error: "videoId is required" },
        { status: 400 }
      );
    }

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get video details
    const { data: video, error: fetchError } = await supabase
      .from("videos")
      .select("title, description")
      .eq("id", videoId)
      .single();

    if (fetchError || !video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Categorize
    const category = await categorizeWithAI(video.title, video.description);

    // Update video
    const { error: updateError } = await supabase
      .from("videos")
      .update({ category })
      .eq("id", videoId);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update category" },
        { status: 500 }
      );
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Categorization error:", error);
    return NextResponse.json(
      { error: "Categorization failed" },
      { status: 500 }
    );
  }
}
