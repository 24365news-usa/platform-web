import Link from "next/link";
import { ArrowLeft, MapPin, Link as LinkIcon, Video, Eye } from "lucide-react";
import VideoGrid from "@/components/VideoGrid";

// This will be replaced with actual data fetching from Supabase
async function getContributor(id: string) {
  return {
    id,
    user_id: id,
    display_name: "Citizen Journalist",
    bio: "Independent journalist covering local news and events.",
    location: "United States",
    website: null,
    video_count: 0,
    total_views: 0,
    created_at: new Date().toISOString(),
  };
}

async function getContributorVideos(userId: string) {
  // Return empty array for now
  return [];
}

export default async function ContributorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contributor = await getContributor(id);
  const videos = await getContributorVideos(id);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
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
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
              👤
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">
                {contributor.display_name}
              </h1>
              
              {contributor.bio && (
                <p className="text-slate-300 mb-4">{contributor.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 text-slate-400 text-sm">
                {contributor.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {contributor.location}
                  </span>
                )}
                {contributor.website && (
                  <a
                    href={contributor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white transition"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Website
                  </a>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                  <Video className="w-6 h-6 text-red-500" />
                  {contributor.video_count}
                </div>
                <p className="text-slate-400 text-sm">Videos</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                  <Eye className="w-6 h-6 text-blue-500" />
                  {contributor.total_views.toLocaleString()}
                </div>
                <p className="text-slate-400 text-sm">Views</p>
              </div>
            </div>
          </div>
        </div>

        {/* Videos */}
        <h2 className="text-xl font-semibold mb-4">Videos</h2>
        <VideoGrid 
          videos={videos} 
          emptyMessage="No videos published yet" 
        />
      </main>
    </div>
  );
}
