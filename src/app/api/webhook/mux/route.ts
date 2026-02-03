import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Mux webhook handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Create Supabase client inline to avoid build-time evaluation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (type) {
      case "video.upload.asset_created":
        // Upload completed, asset is being processed
        await supabase
          .from("videos")
          .update({
            mux_asset_id: data.asset_id,
            status: "processing",
          })
          .eq("mux_upload_id", data.id);
        break;

      case "video.asset.ready":
        // Asset is ready for playback
        const playbackId = data.playback_ids?.[0]?.id;
        await supabase
          .from("videos")
          .update({
            mux_playback_id: playbackId,
            duration: data.duration,
            status: "ready",
          })
          .eq("mux_asset_id", data.id);
        break;

      case "video.asset.errored":
        // Asset processing failed
        await supabase
          .from("videos")
          .update({
            status: "error",
            error_message: data.errors?.messages?.join(", ") || "Processing failed",
          })
          .eq("mux_asset_id", data.id);
        break;

      default:
        // Ignore other webhook types
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
