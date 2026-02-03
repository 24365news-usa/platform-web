"use client";

import { useEffect } from 'react';

export default function NewsManager() {
  useEffect(() => {
    // Initialize news refresh system
    const initializeNews = async () => {
      try {
        // Start auto-refresh system
        const response = await fetch('/api/auto-refresh', { method: 'POST' });
        if (response.ok) {
          const data = await response.json();
          console.log('📰 News auto-refresh system started:', data.message);
        }
      } catch (error) {
        console.error('Failed to initialize news system:', error);
      }
    };

    initializeNews();
  }, []);

  return null; // This component renders nothing
}