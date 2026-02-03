import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log("Mux webhook received:", type);

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase config");
      return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle video.asset.ready - video is done processing
    if (type === "video.asset.ready") {
      const assetId = data.id;
      const playbackId = data.playback_ids?.[0]?.id;
      const duration = data.duration;
      const uploadId = data.upload_id;

      console.log("Asset ready:", { assetId, playbackId, uploadId });

      // Generate thumbnail URL
      const thumbnailUrl = playbackId 
        ? `https://image.mux.com/${playbackId}/thumbnail.jpg?width=640&height=360&fit_mode=smartcrop`
        : null;

      // Update video record by upload_id
      const { data: video, error } = await supabase
        .from("videos")
        .update({
          mux_asset_id: assetId,
          mux_playback_id: playbackId,
          duration: duration,
          thumbnail_url: thumbnailUrl,
          status: "ready",
        })
        .eq("mux_upload_id", uploadId)
        .select("id")
        .single();

      if (error) {
        console.error("Failed to update video:", error);
      } else {
        console.log("Video updated successfully");
        
        // Trigger AI categorization
        if (video?.id) {
          const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://24365.news";
          fetch(`${appUrl}/api/categorize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoId: video.id }),
          }).catch((err) => console.error("Categorization trigger failed:", err));
        }
      }
    }

    // Handle video.asset.errored - processing failed
    if (type === "video.asset.errored") {
      const uploadId = data.upload_id;
      
      await supabase
        .from("videos")
        .update({ status: "error" })
        .eq("mux_upload_id", uploadId);
    }

    // Handle video.upload.cancelled
    if (type === "video.upload.cancelled") {
      const uploadId = data.id;
      
      await supabase
        .from("videos")
        .update({ status: "cancelled" })
        .eq("mux_upload_id", uploadId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
