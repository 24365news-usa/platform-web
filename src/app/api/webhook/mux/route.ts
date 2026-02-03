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

      // Update video record by upload_id
      const { error } = await supabase
        .from("videos")
        .update({
          mux_asset_id: assetId,
          mux_playback_id: playbackId,
          duration: duration,
          status: "ready",
        })
        .eq("mux_upload_id", uploadId);

      if (error) {
        console.error("Failed to update video:", error);
      } else {
        console.log("Video updated successfully");
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
