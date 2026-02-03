import Link from "next/link";
import { Users, Video, FileText, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

// Admin dashboard - will require admin auth in production
export default function AdminPage() {
  // Mock stats - will come from Supabase
  const stats = {
    totalContributors: 0,
    pendingApplications: 0,
    totalVideos: 0,
    totalViews: 0,
    videosToday: 0,
    viewsToday: 0,
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <p className="text-3xl font-bold">{stats.totalContributors}</p>
            <p className="text-slate-400 text-sm">Contributors</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <FileText className="w-8 h-8 text-yellow-500 mb-2" />
            <p className="text-3xl font-bold">{stats.pendingApplications}</p>
            <p className="text-slate-400 text-sm">Pending Applications</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Video className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-3xl font-bold">{stats.totalVideos}</p>
            <p className="text-slate-400 text-sm">Total Videos</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
            <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
            <p className="text-slate-400 text-sm">Total Views</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link 
            href="/admin/applications"
            className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-yellow-500" />
              {stats.pendingApplications > 0 && (
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                  {stats.pendingApplications} new
                </span>
              )}
            </div>
            <h3 className="font-semibold mb-1 group-hover:text-red-400 transition">
              Review Applications
            </h3>
            <p className="text-slate-400 text-sm">
              Approve or reject contributor applications
            </p>
          </Link>

          <Link 
            href="/admin/contributors"
            className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition group"
          >
            <Users className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-1 group-hover:text-red-400 transition">
              Manage Contributors
            </h3>
            <p className="text-slate-400 text-sm">
              View and manage network contributors
            </p>
          </Link>

          <Link 
            href="/admin/videos"
            className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition group"
          >
            <Video className="w-8 h-8 text-red-500 mb-4" />
            <h3 className="font-semibold mb-1 group-hover:text-red-400 transition">
              Content Moderation
            </h3>
            <p className="text-slate-400 text-sm">
              Review and moderate uploaded videos
            </p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Recent Applications</h3>
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No applications yet</p>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Recent Videos</h3>
            <div className="text-center py-8 text-slate-500">
              <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No videos yet</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
