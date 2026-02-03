"use client";

import { useState, useEffect } from "react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        
        if (data.news && data.news.length > 0) {
          setNews(data.news);
          // Log if we're getting real feeds
          if (data.realFeeds) {
            console.log('📰 Live news feeds loaded from Reuters, CNN, BBC, NPR');
          } else {
            console.log('📰 Curated news content loaded (RSS feeds unavailable)');
          }
        } else {
          // Ultimate fallback
          setNews([
            { title: "24365.News - Breaking: Citizen journalism network launches nationwide", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
            { title: "Real-time news from independent journalists across America", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
            { title: "Join the distributed news revolution - 24 hours, 365 days", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
          ]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews([
          { title: "24365.News - Your source for distributed citizen journalism", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
          { title: "Real people, real stories, real news - 24/7/365", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    };

    // Load immediately
    fetchNews();
    
    // Refresh every 10 minutes
    const interval = setInterval(fetchNews, 10 * 60 * 1000);
    return () => clearInterval(interval);
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
              <div className="animate-pulse text-white text-base">Loading latest headlines...</div>
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
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll flex gap-12 whitespace-nowrap">
                {news.concat(news).map((item, index) => (
                  <a
                    key={`${item.link}-${index}`}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white hover:text-red-200 transition shrink-0"
                  >
                    <span className="text-red-300 font-semibold text-base">{item.source}:</span>
                    <span className="text-base">{item.title}</span>
                    <span className="text-red-400 text-lg">•</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}