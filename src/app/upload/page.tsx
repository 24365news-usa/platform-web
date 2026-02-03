"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, Upload, Loader2, CheckCircle, AlertCircle, Film } from "lucide-react";
import { STATES_CITIES } from "@/lib/locations";

const CATEGORIES = [
  { id: "", label: "Auto-detect from content" },
  { id: "breaking", label: "Breaking News" },
  { id: "politics", label: "Politics" },
  { id: "local", label: "Local News" },
  { id: "weather", label: "Weather" },
  { id: "sports", label: "Sports" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "technology", label: "Technology" },
  { id: "health", label: "Health" },
];

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "OTHER", name: "Other Country" },
];

export default function UploadPage() {
  const { isSignedIn, user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("US"); // Default to US
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "complete" | "error">("idle");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get available cities for selected state (US only)
  const availableCities = (country === "US" && state) ? STATES_CITIES.find(s => s.state === state)?.cities || [] : [];
  const isUSA = country === "US";

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      const validTypes = ["video/mp4", "video/quicktime", "video/webm", "video/x-m4v"];
      if (!validTypes.includes(selectedFile.type)) {
        setError("Please select a valid video file (MP4, MOV, WebM)");
        return;
      }
      // Check file size (5GB max)
      if (selectedFile.size > 5 * 1024 * 1024 * 1024) {
        setError("File size must be under 5GB");
        return;
      }
      setFile(selectedFile);
      setError("");
      // Auto-fill title from filename if empty
      if (!title) {
        const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
        setTitle(nameWithoutExt);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      setError("Please select a file and enter a title");
      return;
    }

    setUploading(true);
    setStatus("uploading");
    setError("");
    setProgress(0);

    try {
      // Step 1: Get upload URL from our API
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: title.trim(), 
          description: description.trim(),
          category: category || null,
          country: country || null,
          state: state || null,
          city: city || null
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to initialize upload");
      }

      const { url, videoId } = await response.json();

      // Step 2: Upload directly to Mux
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          setStatus("processing");
          // Video is now processing at Mux
          setTimeout(() => {
            setStatus("complete");
          }, 2000);
        } else {
          throw new Error("Upload failed");
        }
      });

      xhr.addEventListener("error", () => {
        throw new Error("Upload failed");
      });

      xhr.open("PUT", url);
      xhr.send(file);

    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Upload failed");
      setStatus("error");
      setUploading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign In Required</h1>
          <p className="text-slate-400 mb-6">You need to be signed in to upload videos.</p>
          <Link 
            href="/sign-in"
            className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-lg transition inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

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
        {status === "complete" ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-400 mb-2">Upload Complete!</h2>
            <p className="text-slate-300 mb-6">
              Your video is being processed and will be available shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setStatus("idle");
                  setFile(null);
                  setTitle("");
                  setDescription("");
                  setCategory("");
                  setCountry("US");
                  setState("");
                  setCity("");
                  setProgress(0);
                }}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition"
              >
                Upload Another
              </button>
              <Link
                href="/dashboard"
                className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-lg transition"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-6">Video Details</h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* File Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Video File <span className="text-red-500">*</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm,video/x-m4v"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={uploading}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full bg-slate-700 border-2 border-dashed border-slate-600 rounded-lg p-8 hover:border-red-500 transition text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <Film className="w-8 h-8 text-red-500" />
                      <div className="text-left">
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-slate-400">
                          {(file.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-400">Click to select a video</p>
                      <p className="text-sm text-slate-500 mt-1">MP4, MOV, WebM up to 5GB</p>
                    </>
                  )}
                </button>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter video title"
                  disabled={uploading}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition disabled:opacity-50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this video about?"
                  rows={4}
                  disabled={uploading}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition resize-none disabled:opacity-50"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={uploading}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition disabled:opacity-50"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-slate-500 mt-1">
                  Leave as "Auto-detect" to let AI categorize your video
                </p>
              </div>

              {/* Location */}
              <div className="space-y-4">
                {/* Country */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setState("");
                      setCity("");
                    }}
                    disabled={uploading}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition disabled:opacity-50"
                  >
                    {COUNTRIES.map((countryData) => (
                      <option key={countryData.code} value={countryData.code}>
                        {countryData.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* State/Province */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isUSA ? "State/Territory" : "State/Province"}
                    </label>
                    {isUSA ? (
                      <select
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          setCity(""); // Clear city when state changes
                        }}
                        disabled={uploading}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition disabled:opacity-50"
                      >
                        <option value="">Auto-detect location</option>
                        {STATES_CITIES.map((stateData) => (
                          <option key={stateData.state} value={stateData.state}>
                            {stateData.state}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Enter state/province (optional)"
                        disabled={uploading}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition disabled:opacity-50"
                      />
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>
                    {isUSA ? (
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={uploading || !state}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition disabled:opacity-50"
                      >
                        <option value="">
                          {state ? "Select city (optional)" : "Select state first"}
                        </option>
                        {availableCities.map((cityName) => (
                          <option key={cityName} value={cityName}>
                            {cityName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city (optional)"
                        disabled={uploading}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition disabled:opacity-50"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {(status === "uploading" || status === "processing") && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">
                      {status === "uploading" ? "Uploading..." : "Processing..."}
                    </span>
                    <span className="text-slate-400">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${status === "processing" ? 100 : progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!file || !title.trim() || uploading}
                className="w-full bg-gradient-to-r from-red-700 to-blue-700 hover:from-red-600 hover:to-blue-600 px-6 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {status === "uploading" ? "Uploading..." : "Processing..."}
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Video
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <p className="text-sm text-slate-500 mt-4 text-center">
          Videos are automatically optimized for streaming. Processing typically takes 1-2 minutes.
        </p>
      </main>
    </div>
  );
}
