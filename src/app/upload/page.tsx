"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2, AlertCircle } from "lucide-react";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className="text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Upload Video</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Coming Soon Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-8 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-400 mb-1">Upload Coming Soon</h3>
            <p className="text-slate-300">
              Video upload requires authentication and service configuration. 
              This interface shows what contributors will see when the platform launches.
            </p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-6">Video Details</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this video about?"
                rows={4}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition resize-none"
              />
            </div>

            <button
              disabled
              className="w-full bg-slate-600 px-6 py-4 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Disabled — Auth Required
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-500 mt-4 text-center">
          When enabled, this will support MP4, MOV, WebM up to 5GB. Videos are automatically 
          optimized for streaming via Mux.
        </p>
      </main>
    </div>
  );
}
