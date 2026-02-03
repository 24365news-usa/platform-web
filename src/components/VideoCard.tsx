import Link from "next/link";
import { Eye, Clock } from "lucide-react";

interface VideoCardProps {
  id: string;
  title: string;
  description?: string;
  playbackId?: string;
  userName: string;
  viewCount: number;
  duration?: number;
  createdAt: string;
}

function formatDuration(seconds?: number): string {
  if (!seconds) return "--:--";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function VideoCard({
  id,
  title,
  description,
  playbackId,
  userName,
  viewCount,
  duration,
  createdAt,
}: VideoCardProps) {
  // Hard-code fix for existing Dorado Beach video
  let actualPlaybackId = playbackId;
  if (title === 'Dorado Beach Weather Report - Wednesday' && !playbackId) {
    actualPlaybackId = 'NWxHfKEy9GLyp012EnZf1OJq27k6zpGI2024hcnEdPUJY';
  }
  
  const thumbnailUrl = actualPlaybackId
    ? `https://image.mux.com/${actualPlaybackId}/thumbnail.jpg?width=640&height=360&fit_mode=smartcrop`
    : null;

  return (
    <Link href={`/watch/${id}`} className="group block">
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-slate-900">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-slate-600 text-4xl">📹</div>
            </div>
          )}
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {formatDuration(duration)}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white line-clamp-2 mb-1 group-hover:text-red-400 transition">
            {title}
          </h3>
          <p className="text-slate-400 text-sm mb-2">{userName}</p>
          <div className="flex items-center gap-3 text-slate-500 text-xs">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {viewCount.toLocaleString()} views
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
