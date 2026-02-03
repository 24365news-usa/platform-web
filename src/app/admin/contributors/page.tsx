import Link from "next/link";
import { ArrowLeft, Search, Video, Eye, MapPin, MoreVertical } from "lucide-react";

// Mock data - will come from Supabase
const mockContributors: Array<{
  id: string;
  display_name: string;
  location: string;
  video_count: number;
  total_views: number;
  status: string;
  created_at: string;
}> = [];

export default function ContributorsPage() {
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
          <h1 className="text-2xl font-bold">Contributors</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search contributors..."
                className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-500 transition w-64"
              />
            </div>
          </div>
        </div>

        {mockContributors.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-16 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h2 className="text-xl font-semibold mb-2">No Contributors Yet</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Once applications are approved, contributors will appear here.
              You can manage their access and view their performance.
            </p>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-slate-700">
                <tr className="text-left text-slate-400 text-sm">
                  <th className="px-6 py-4">Contributor</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Videos</th>
                  <th className="px-6 py-4">Views</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {mockContributors.map((contributor) => (
                  <tr
                    key={contributor.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                          👤
                        </div>
                        <span className="font-medium">
                          {contributor.display_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {contributor.location}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1">
                        <Video className="w-4 h-4 text-red-500" />
                        {contributor.video_count}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-blue-500" />
                        {contributor.total_views.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          contributor.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : contributor.status === "suspended"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {contributor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-slate-400 hover:text-white transition">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
