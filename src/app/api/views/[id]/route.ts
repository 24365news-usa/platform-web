import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // First get current view count
    const { data: video, error: fetchError } = await supabase
      .from("videos")
      .select("view_count")
      .eq("id", id)
      .single();

    if (fetchError || !video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Increment view count (using service role to bypass RLS)
    const newViewCount = (video.view_count || 0) + 1;
    
    const { error: updateError } = await supabase
      .from("videos")
      .update({ view_count: newViewCount })
      .eq("id", id);

    if (updateError) {
      console.error("Failed to increment views:", updateError);
      return NextResponse.json({ error: "Failed to update views" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      viewCount: newViewCount 
    });

  } catch (error) {
    console.error("View tracking error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}