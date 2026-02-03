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

    // Update the specific Dorado Beach video
    const videoId = 'b875b8c6-6847-4995-9433-c2cd7488cbd5';
    const playbackId = 'NWxHfKEy9GLyp012EnZf1OJq27k6zpGI2024hcnEdPUJY';
    const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?width=320&height=180&fit_mode=smartcrop`;

    const { data: updated, error } = await supabase
      .from("videos")
      .update({
        mux_playback_id: playbackId,
        thumbnail_url: thumbnailUrl
      })
      .eq('id', videoId)
      .select();

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json({ 
        error: error.message,
        details: error
      }, { status: 500 });
    }

    // Get the updated video to verify
    const { data: video, error: fetchError } = await supabase
      .from("videos")
      .select("id, title, mux_playback_id, thumbnail_url")
      .eq('id', videoId)
      .single();

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: "Video updated successfully",
      updated: updated?.length || 0,
      video: video
    });

  } catch (error) {
    console.error("Update video error:", error);
    return NextResponse.json({ 
      error: "Failed to update video",
      details: String(error)
    }, { status: 500 });
  }
}