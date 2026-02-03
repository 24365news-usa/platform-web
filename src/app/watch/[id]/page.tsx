import Link from "next/link";
import { ArrowLeft, Eye, Clock, Share2, ThumbsUp } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";

// This will be replaced with actual data fetching from Supabase
async function getVideo(id: string) {
  // Mock data for now
  return {
    id,
    title: "Sample Video",
    description: "This is a sample video description. When the platform is live, this will show real content from citizen journalists.",
    user_name: "Contributor",
    user_id: "user_123",
    mux_playback_id: null, // Will be real playback ID when video is uploaded
    view_count: 0,
    duration: 120,
    created_at: new Date().toISOString(),
    is_published: true,
  };
}

function formatDuration(seconds?: number): string {
  if (!seconds) return "--:--";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await getVideo(id);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/watch"
              className="text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-500">24365</span>
              <span className="text-2xl font-light">.News</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Video player */}
            {video.mux_playback_id ? (
              <VideoPlayer
                playbackId={video.mux_playback_id}
                title={video.title}
                className="mb-6"
              />
            ) : (
              <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">📹</div>
                  <p className="text-slate-400">Video preview not available</p>
                </div>
              </div>
            )}

            {/* Video info */}
            <h1 className="text-2xl font-bold mb-4">{video.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-slate-700">
              <span className="text-slate-400 flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {video.view_count.toLocaleString()} views
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDuration(video.duration)}
              </span>
              <span className="text-slate-400">
                {new Date(video.created_at).toLocaleDateString()}
              </span>

              <div className="flex-1" />

              <button className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                <ThumbsUp className="w-5 h-5" />
                Like
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Contributor */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <p className="font-semibold">{video.user_name}</p>
                <p className="text-slate-400 text-sm">Citizen Journalist</p>
              </div>
            </div>

            {/* Description */}
            {video.description && (
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-300 whitespace-pre-wrap">
                  {video.description}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - related videos */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-4">More from 24365.News</h3>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
              <p className="text-slate-400">More videos coming soon</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
