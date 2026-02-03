import Link from "next/link";
import { ArrowLeft, Search, Eye, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

// Mock data - will come from Supabase
const mockVideos: Array<{
  id: string;
  title: string;
  user_name: string;
  status: string;
  view_count: number;
  created_at: string;
  mux_playback_id?: string;
}> = [];

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/admin"
            className="text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-500">24365</span>
              <span className="text-2xl font-light">.News</span>
            </Link>
            <span className="bg-red-600 text-xs px-2 py-1 rounded font-semibold">
              ADMIN
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Content Moderation</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search videos..."
                className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-500 transition w-64"
              />
            </div>
            <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition">
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="flagged">Flagged</option>
              <option value="removed">Removed</option>
            </select>
          </div>
        </div>

        {mockVideos.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-16 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-xl font-semibold mb-2">No Videos to Review</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              When contributors upload videos, they&apos;ll appear here for moderation.
              You can approve, flag, or remove content as needed.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockVideos.map((video) => (
              <div
                key={video.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex gap-4"
              >
                {/* Thumbnail */}
                <div className="w-48 h-27 bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  {video.mux_playback_id ? (
                    <img
                      src={`https://image.mux.com/${video.mux_playback_id}/thumbnail.jpg?width=192`}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-3xl">📹</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                      <p className="text-slate-400 text-sm">{video.user_name}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                        video.status === "ready"
                          ? "bg-green-500/20 text-green-400"
                          : video.status === "processing"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : video.status === "flagged"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {video.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {video.view_count.toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTimeAgo(video.created_at)}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-3 py-1.5 rounded text-sm transition flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 px-3 py-1.5 rounded text-sm transition flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      Flag
                    </button>
                    <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-1.5 rounded text-sm transition flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Remove
                    </button>
                    <Link
                      href={`/watch/${video.id}`}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded text-sm transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
