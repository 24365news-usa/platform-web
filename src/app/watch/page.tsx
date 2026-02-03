import Link from "next/link";
import { Search, Filter, TrendingUp } from "lucide-react";
import VideoGrid from "@/components/VideoGrid";

// This will be replaced with actual data fetching from Supabase
async function getPublishedVideos() {
  // Return empty array for now - will fetch from Supabase when configured
  return [];
}

export default async function WatchPage() {
  const videos = await getPublishedVideos();

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
          <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            All
          </button>
          <button className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-4 py-2 rounded-full text-sm font-medium transition">
            Breaking
          </button>
          <button className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-4 py-2 rounded-full text-sm font-medium transition">
            Politics
          </button>
          <button className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-4 py-2 rounded-full text-sm font-medium transition">
            Local
          </button>
          <button className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-4 py-2 rounded-full text-sm font-medium transition">
            Weather
          </button>
          <button className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-4 py-2 rounded-full text-sm font-medium transition">
            Sports
          </button>
        </div>

        {/* Trending section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold">Trending Now</h2>
          </div>

          {videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-16 text-center">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-6">
                Our network of citizen journalists is getting ready to launch. 
                Be among the first to share your stories.
              </p>
              <Link
                href="/sign-up"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition inline-block"
              >
                Become a Contributor
              </Link>
            </div>
          )}
        </div>

        {/* Latest section - shows when there are videos */}
        {videos.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Latest</h2>
            <VideoGrid videos={videos} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-500">
          <p>&copy; 2025 24365.News — A Wyoming Corporation</p>
        </div>
      </footer>
    </div>
  );
}
