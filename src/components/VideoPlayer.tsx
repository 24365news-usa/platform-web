"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  playbackId: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
}

export default function VideoPlayer({
  playbackId,
  title,
  autoPlay = false,
  muted = false,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mux stream URL format
  const streamUrl = `https://stream.mux.com/${playbackId}.m3u8`;
  const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Load HLS.js for browsers that don't support HLS natively
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari has native HLS support
      video.src = streamUrl;
    } else {
      // Use HLS.js for other browsers
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(streamUrl);
          hls.attachMedia(video);
        }
      });
    }
  }, [playbackId, streamUrl]);

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        poster={posterUrl}
        controls
        autoPlay={autoPlay}
        muted={muted}
        playsInline
        className="w-full aspect-video"
        title={title}
      >
        {/* Fallback for browsers without JS */}
        <source src={streamUrl} type="application/x-mpegURL" />
        Your browser does not support video playback.
      </video>
    </div>
  );
}
