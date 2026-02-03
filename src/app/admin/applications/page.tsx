import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Clock, MapPin, ExternalLink } from "lucide-react";

// Mock data - will come from Supabase
const mockApplications = [
  // Empty for now - applications will populate here
];

export default function ApplicationsPage() {
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
          <h1 className="text-2xl font-bold">Contributor Applications</h1>
          <div className="flex gap-2">
            <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm transition">
              All
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition">
              Pending
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition">
              Approved
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition">
              Rejected
            </button>
          </div>
        </div>

        {mockApplications.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-16 text-center">
            <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Applications Yet</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              When contributors apply through the website, their applications 
              will appear here for review.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Application cards will render here */}
          </div>
        )}

        {/* Example application card (hidden but shows structure) */}
        <div className="hidden">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">John Doe</h3>
                <p className="text-slate-400 text-sm">john@example.com</p>
              </div>
              <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">
                Pending
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                California
              </span>
              <span>Applied 2 hours ago</span>
            </div>

            <p className="text-slate-300 mb-4 line-clamp-3">
              I&apos;m a local journalist covering city council meetings and community 
              events in San Francisco. I&apos;ve been producing content for 3 years...
            </p>

            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                View portfolio
              </a>
              <div className="flex gap-2">
                <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
