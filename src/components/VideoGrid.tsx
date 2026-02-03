import VideoCard from "./VideoCard";

interface Video {
  id: string;
  title: string;
  description?: string;
  mux_playback_id?: string;
  user_name: string;
  view_count: number;
  duration?: number;
  created_at: string;
}

interface VideoGridProps {
  videos: Video[];
  emptyMessage?: string;
}

export default function VideoGrid({ 
  videos, 
  emptyMessage = "No videos yet" 
}: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-16 text-center">
        <div className="text-slate-600 text-5xl mb-4">📹</div>
        <p className="text-slate-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          description={video.description}
          playbackId={video.mux_playback_id}
          userName={video.user_name}
          viewCount={video.view_count}
          duration={video.duration}
          createdAt={video.created_at}
        />
      ))}
    </div>
  );
}
