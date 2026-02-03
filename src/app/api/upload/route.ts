import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { createClient } from "@supabase/supabase-js";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const { title, description } = await request.json();

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Initialize Mux client
    const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
    });

    // Create a direct upload URL with Mux
    const upload = await mux.video.uploads.create({
      cors_origin: process.env.NEXT_PUBLIC_APP_URL || "*",
      new_asset_settings: {
        playback_policy: ["public"],
        encoding_tier: "baseline",
      },
    });

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: video, error } = await supabase
      .from("videos")
      .insert({
        title: title.trim(),
        description: description?.trim() || null,
        user_id: userId,
        user_name: user?.firstName || "Anonymous",
        mux_upload_id: upload.id,
        mux_asset_id: null, // Will be set by webhook when processing completes
        status: "uploading",
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to create video record" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      uploadId: upload.id,
      url: upload.url,
      videoId: video.id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to create upload" },
      { status: 500 }
    );
  }
}
