"use client";

import { useEffect } from 'react';

interface ViewTrackerProps {
  videoId: string;
}

export default function ViewTracker({ videoId }: ViewTrackerProps) {
  useEffect(() => {
    // Track view when component mounts
    const trackView = async () => {
      try {
        const response = await fetch(`/api/views/${videoId}`, {
          method: 'POST',
        });
        
        if (!response.ok) {
          console.warn('Failed to track view');
        }
      } catch (error) {
        console.warn('View tracking error:', error);
      }
    };

    trackView();
  }, [videoId]);

  // This component doesn't render anything visible
  return null;
}