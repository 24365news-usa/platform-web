import Link from "next/link";
import { Upload, Video, Eye, Clock } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";

async function getUserVideos(userId: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user videos:", error);
    return [];
  }

  return data || [];
}

// Stats now calculated directly from userVideos data for consistency

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName || "Contributor";
  const userId = user?.id || "";
  
  const userVideos = await getUserVideos(userId);
  
  // Calculate stats from the same data
  const videoCount = userVideos.length;
  const totalViews = userVideos.reduce((sum: number, video: any) => sum + (video.views || 0), 0);
  const watchMinutes = userVideos.reduce((sum: number, video: any) => {
    const durationSeconds = video.duration || 0;
    const views = video.views || 0;
    return sum + (durationSeconds * views / 60);
  }, 0);
  const watchHours = Math.round(watchMinutes / 60 * 10) / 10;
  
  const stats = { videoCount, totalViews, watchHours };
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur z-10">
        <Navigation />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back, {firstName}!</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Video className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{stats.videoCount}</p>
                <p className="text-slate-400 text-sm">Videos</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
                <p className="text-slate-400 text-sm">Total Views</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.watchHours}</p>
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
          
          {/* Debug info - remove this later */}
          <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700 rounded text-sm">
            <p>Debug: User ID = {userId}</p>
            <p>Found {userVideos.length} videos for this user</p>
          </div>
          
          {userVideos.length > 0 ? (
            <div className="grid gap-4">
              {userVideos.slice(0, 5).map((video: any) => (
                <div key={video.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center gap-4">
                  {video.thumbnail_url && (
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="text-slate-400 text-sm">{video.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <span>{video.views || 0} views</span>
                      <span>{new Date(video.created_at).toLocaleDateString()}</span>
                      <span className="capitalize">{video.status}</span>
                    </div>
                  </div>
                  <Link
                    href={`/watch/${video.id}`}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition"
                  >
                    Watch
                  </Link>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </main>
    </div>
  );
}
