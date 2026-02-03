"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchCachedNews = async () => {
      try {
        const response = await fetch('/api/refresh-news');
        if (response.ok) {
          const data = await response.json();
          if (data.news && data.news.length > 0) {
            setNews(data.news);
            console.log(`📰 Loaded ${data.news.length} cached news stories`);
          }
        } else {
          // Trigger refresh if no cache exists
          const refreshResponse = await fetch('/api/refresh-news', { method: 'POST' });
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            // Try fetching again after refresh
            setTimeout(fetchCachedNews, 2000);
          }
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        // Fallback stories
        setNews([
          { title: "BREAKING: 24365.News launches distributed journalism network", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
          { title: "LIVE: Citizen reporters cover breaking news 24/7", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
          { title: "DEVELOPING: Independent media challenges traditional outlets", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCachedNews();
  }, []);

  if (loading) {
    return (
      <section className="bg-red-950/20 border-y border-red-800/30">
        <div className="py-4">
          <div className="max-w-[300%] mx-auto">
            <div className="flex items-center gap-6">
              <div className="bg-red-700 text-white px-4 py-2 text-base font-bold rounded">
                LIVE NEWS
              </div>
              <div className="text-white text-base">Loading headlines...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-red-950/20 border-y border-red-800/30 overflow-hidden">
      <div className="py-4">
        <div className="max-w-[300%] mx-auto">
          <div className="flex items-center gap-6">
            <div className="bg-red-700 text-white px-4 py-2 text-base font-bold rounded shrink-0">
              LIVE NEWS
            </div>
            <div 
              className="flex-1 overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                className="flex whitespace-nowrap"
                style={{ gap: '4rem' }}
                animate={isPaused ? {} : { x: ['0%', '-50%'] }}
                transition={{
                  duration: 8,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
              >
                {news.concat(news).map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="inline-flex items-center text-white shrink-0"
                    style={{ gap: '0.75rem' }}
                  >
                    <span className="text-red-300 font-semibold text-base">{item.source}:</span>
                    <span className="text-base">{item.title}</span>
                    <span className="text-red-400 text-lg ml-4">•</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}