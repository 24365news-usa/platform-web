import Link from "next/link";
import { Search, TrendingUp, Home } from "lucide-react";
import VideoGrid from "@/components/VideoGrid";
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

async function getVideos(category?: string) {
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

  // Filter by category if specified (and not "all")
  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }

  return data || [];
}

export default async function WatchPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const currentCategory = params.category || "all";
  const videos = await getVideos(currentCategory);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl font-bold text-red-500">24365</span>
            <span className="text-2xl font-light">.News</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="search"
                placeholder="Search news..."
                className="w-full bg-slate-800 border border-slate-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-red-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-white transition hidden sm:block"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id === "all" ? "/watch" : `/watch?category=${cat.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                currentCategory === cat.id
                  ? "bg-red-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Videos section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold">
              {currentCategory === "all"
                ? "All Videos"
                : CATEGORIES.find((c) => c.id === currentCategory)?.label || "Videos"}
            </h2>
          </div>

          {videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-16 text-center">
              <div className="text-6xl mb-4">
                {currentCategory === "weather" ? "🌤️" : 
                 currentCategory === "politics" ? "🏛️" :
                 currentCategory === "sports" ? "⚽" :
                 currentCategory === "breaking" ? "🚨" :
                 currentCategory === "local" ? "📍" : "🎬"}
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                {currentCategory === "all" 
                  ? "Coming Soon" 
                  : `No ${CATEGORIES.find((c) => c.id === currentCategory)?.label} Videos Yet`}
              </h3>
              <p className="text-slate-400 max-w-md mx-auto mb-6">
                {currentCategory === "all"
                  ? "Our network of citizen journalists is getting ready to launch. Be among the first to share your stories."
                  : "Be the first to upload a video in this category!"}
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
