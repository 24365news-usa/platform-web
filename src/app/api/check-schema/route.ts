import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get one video record to see the current structure
    const { data: video, error } = await supabase
      .from("videos")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      columns: Object.keys(video || {}),
      sample_data: video
    });
  } catch (error) {
    console.error("Schema check error:", error);
    return NextResponse.json(
      { error: "Schema check failed" },
      { status: 500 }
    );
  }
}