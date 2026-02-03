import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update the Dorado Beach video with missing data
    const { data: updated, error } = await supabase
      .from("videos")
      .update({
        mux_playback_id: 'NWxHfKEy9GLyp012EnZf1OJq27k6zpGI2024hcnEdPUJY',
        thumbnail_url: 'https://image.mux.com/NWxHfKEy9GLyp012EnZf1OJq27k6zpGI2024hcnEdPUJY/thumbnail.jpg?width=320&height=180&fit_mode=smartcrop',
        status: 'ready'
      })
      .eq('title', 'Dorado Beach Weather Report - Wednesday')
      .select();

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the updated video data
    const { data: videos, error: fetchError } = await supabase
      .from("videos")
      .select("*")
      .eq('title', 'Dorado Beach Weather Report - Wednesday');

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      updated: updated?.length || 0,
      video: videos?.[0] || null
    });

  } catch (error) {
    console.error("Fix video error:", error);
    return NextResponse.json({ error: "Failed to fix video" }, { status: 500 });
  }
}