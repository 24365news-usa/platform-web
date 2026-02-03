import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { US_STATES_AND_TERRITORIES } from "@/lib/locations";

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

interface ClassificationResult {
  category: Category;
  state: string | null;
  city: string | null;
}

async function classifyWithAI(
  title: string,
  description: string | null
): Promise<ClassificationResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.log("No Anthropic API key, using keyword matching");
    return {
      category: categorizeByKeywords(title, description),
      ...extractLocationByKeywords(title, description),
    };
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const stateNames = US_STATES_AND_TERRITORIES.map((s) => s.name).join(", ");

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: `Analyze this news video and extract:
1. Category (ONE of: ${CATEGORIES.join(", ")})
2. US State or Territory (ONE of: ${stateNames}, or null if not identifiable)
3. City (if mentioned, otherwise null)

Title: ${title}
Description: ${description || "No description"}

Reply in this exact JSON format only, no other text:
{"category": "...", "state": "..." or null, "city": "..." or null}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type === "text") {
      try {
        const parsed = JSON.parse(content.text.trim());
        const category = parsed.category?.toLowerCase() as Category;
        
        return {
          category: CATEGORIES.includes(category) ? category : "general",
          state: parsed.state || null,
          city: parsed.city || null,
        };
      } catch {
        console.error("Failed to parse AI response:", content.text);
      }
    }
  } catch (error) {
    console.error("AI classification failed:", error);
  }

  return {
    category: categorizeByKeywords(title, description),
    ...extractLocationByKeywords(title, description),
  };
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

function extractLocationByKeywords(
  title: string,
  description: string | null
): { state: string | null; city: string | null } {
  const text = `${title} ${description || ""}`.toLowerCase();

  // Common city/state patterns
  const locationPatterns: { state: string; cities: string[] }[] = [
    { state: "Puerto Rico", cities: ["san juan", "dorado", "ponce", "mayaguez", "bayamon", "carolina"] },
    { state: "Florida", cities: ["miami", "orlando", "tampa", "jacksonville", "fort lauderdale"] },
    { state: "California", cities: ["los angeles", "san francisco", "san diego", "sacramento"] },
    { state: "New York", cities: ["new york", "buffalo", "albany", "rochester"] },
    { state: "Texas", cities: ["houston", "dallas", "austin", "san antonio", "fort worth"] },
    // Add more as needed
  ];

  for (const { state, cities } of locationPatterns) {
    // Check for state name
    if (text.includes(state.toLowerCase())) {
      // Try to find a city too
      for (const city of cities) {
        if (text.includes(city)) {
          return { state, city: city.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") };
        }
      }
      return { state, city: null };
    }
    // Check for cities (implies state)
    for (const city of cities) {
      if (text.includes(city)) {
        return { state, city: city.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") };
      }
    }
  }

  return { state: null, city: null };
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

    // Classify (category + location)
    const classification = await classifyWithAI(video.title, video.description);

    // Update video with category and location
    const { error: updateError } = await supabase
      .from("videos")
      .update({
        category: classification.category,
        state: classification.state,
        city: classification.city,
      })
      .eq("id", videoId);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update category" },
        { status: 500 }
      );
    }

    return NextResponse.json(classification);
  } catch (error) {
    console.error("Categorization error:", error);
    return NextResponse.json(
      { error: "Categorization failed" },
      { status: 500 }
    );
  }
}
