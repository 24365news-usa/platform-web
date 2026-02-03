import Link from "next/link";
import { Upload, Video, Eye, Clock } from "lucide-react";

export default function DashboardPage() {
  // TODO: Replace with Clerk auth when credentials are configured
  const user = { firstName: "Contributor" };
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-500">24365</span>
            <span className="text-2xl font-light">.News</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Welcome, {user.firstName}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Coming Soon Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8">
          <p className="text-yellow-400 text-center">
            🚧 Dashboard preview — authentication coming soon
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Video className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-slate-400 text-sm">Videos</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-slate-400 text-sm">Total Views</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-slate-400 text-sm">Watch Hours</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Link 
              href="/upload"
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <Upload className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-lg font-bold">Upload</p>
                <p className="text-slate-400 text-sm">New Video</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/upload"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Video
            </Link>
            <button
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition opacity-50 cursor-not-allowed"
              disabled
            >
              My Videos (Coming Soon)
            </button>
            <button
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition opacity-50 cursor-not-allowed"
              disabled
            >
              Analytics (Coming Soon)
            </button>
          </div>
        </div>

        {/* Recent Videos */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Videos</h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
            <Video className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No videos yet</h3>
            <p className="text-slate-400 mb-4">
              Upload your first video to start building your audience.
            </p>
            <Link
              href="/upload"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition inline-block"
            >
              Upload Your First Video
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
