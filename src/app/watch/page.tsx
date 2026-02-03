import Link from "next/link";
import { TrendingUp } from "lucide-react";
import VideoGrid from "@/components/VideoGrid";
import CategoryFilter from "@/components/CategoryFilter";
import Navigation from "@/components/Navigation";
import { createClient } from "@supabase/supabase-js";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "breaking", label: "Breaking" },
  { id: "politics", label: "Politics" },
  { id: "local", label: "Local" },
  { id: "weather", label: "Weather" },
  { id: "sports", label: "Sports" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "technology", label: "Technology" },
  { id: "health", label: "Health" },
];

interface VideoFilters {
  category?: string;
  state?: string;
  city?: string;
}

async function getVideos(filters: VideoFilters) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  let query = supabase
    .from("videos")
    .select("*")
    .eq("status", "ready")
    .order("created_at", { ascending: false })
    .limit(50);

  // Filter by category (if not "all")
  if (filters.category && filters.category !== "all") {
    query = query.eq("category", filters.category);
  }

  // Filter by location (within the category)
  if (filters.state) {
    query = query.eq("state", filters.state);
  }
  if (filters.city) {
    query = query.eq("city", filters.city);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }

  return data || [];
}

async function getAvailableLocations(category?: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  let query = supabase
    .from("videos")
    .select("state, city")
    .eq("status", "ready")
    .not("state", "is", null);

  // Filter by category to show only locations with videos in this category
  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return [];
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

  return Array.from(locationMap.entries()).map(([state, cities]) => ({
    state,
    cities: Array.from(cities).sort(),
  }));
}

export default async function WatchPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; state?: string; city?: string }>;
}) {
  const params = await searchParams;
  const currentCategory = params.category || "all";
  const currentState = params.state;
  const currentCity = params.city;

  const [videos, availableLocations] = await Promise.all([
    getVideos({ category: currentCategory, state: currentState, city: currentCity }),
    getAvailableLocations(currentCategory),
  ]);

  // Get title based on filters
  const getPageTitle = () => {
    const categoryLabel = CATEGORIES.find((c) => c.id === currentCategory)?.label || "Videos";
    
    if (currentCity && currentState) {
      return `${categoryLabel} in ${currentCity}, ${currentState}`;
    }
    if (currentState) {
      return `${categoryLabel} in ${currentState}`;
    }
    if (currentCategory === "all") {
      return "All Videos";
    }
    return categoryLabel;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur z-10">
        <Navigation />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories with location dropdowns */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <CategoryFilter
              key={cat.id}
              category={cat}
              availableLocations={availableLocations}
              isActive={currentCategory === cat.id}
              showLocationFilter={cat.id !== "all"}
            />
          ))}
        </div>

        {/* Videos section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold">{getPageTitle()}</h2>
          </div>

          {videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-16 text-center">
              <div className="text-6xl mb-4">
                {currentCategory === "weather"
                  ? "🌤️"
                  : currentCategory === "politics"
                  ? "🏛️"
                  : currentCategory === "sports"
                  ? "⚽"
                  : currentCategory === "breaking"
                  ? "🚨"
                  : currentCategory === "local"
                  ? "📍"
                  : "🎬"}
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                {currentState
                  ? `No ${CATEGORIES.find((c) => c.id === currentCategory)?.label || ""} videos from ${currentCity || currentState} yet`
                  : currentCategory === "all"
                  ? "Coming Soon"
                  : `No ${CATEGORIES.find((c) => c.id === currentCategory)?.label} videos yet`}
              </h3>
              <p className="text-slate-400 max-w-md mx-auto mb-6">
                Be the first to upload content in this category!
              </p>
              <Link
                href="/upload"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition inline-block"
              >
                Upload a Video
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-500">
          <p>&copy; 2026 24365.News — A Wyoming Corporation</p>
        </div>
      </footer>
    </div>
  );
}
