import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json([]);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get all unique state/city combinations from videos
  const { data, error } = await supabase
    .from("videos")
    .select("state, city")
    .eq("status", "ready")
    .not("state", "is", null);

  if (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json([]);
  }

  // Group cities by state
  const locationMap = new Map<string, Set<string>>();

  for (const video of data || []) {
    if (video.state) {
      if (!locationMap.has(video.state)) {
        locationMap.set(video.state, new Set());
      }
      if (video.city) {
        locationMap.get(video.state)!.add(video.city);
      }
    }
  }

  // Convert to array format
  const locations = Array.from(locationMap.entries()).map(([state, cities]) => ({
    state,
    cities: Array.from(cities).sort(),
  }));

  return NextResponse.json(locations);
}
