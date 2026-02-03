import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const result = await supabase
    .from("videos")
    .update({
      mux_playback_id: 'NWxHfKEy9GLyp012EnZf1OJq27k6zpGI2024hcnEdPUJY',
      thumbnail_url: 'https://image.mux.com/NWxHfKEy9GLyp012EnZf1OJq27k6zpGI2024hcnEdPUJY/thumbnail.jpg?width=320&height=180&fit_mode=smartcrop'
    })
    .eq('id', 'b875b8c6-6847-4995-9433-c2cd7488cbd5');

  return NextResponse.json(result);
}