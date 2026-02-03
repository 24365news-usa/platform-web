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
        // Using RSS2JSON service to convert RSS to JSON
        const feeds = [
          { url: 'https://feeds.reuters.com/reuters/topNews', source: 'Reuters' },
          { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC' },
          { url: 'https://rss.cnn.com/rss/edition.rss', source: 'CNN' },
          { url: 'https://feeds.npr.org/1001/rss.xml', source: 'NPR' },
          { url: 'https://feeds.washingtonpost.com/rss/politics', source: 'Washington Post' },
        ];

        const allNews: NewsItem[] = [];

        for (const feed of feeds) {
          try {
            const response = await fetch(
              `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=5`
            );
            const data = await response.json();
            
            if (data.status === 'ok' && data.items) {
              const items = data.items.map((item: any) => ({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                source: feed.source
              }));
              allNews.push(...items);
            }
          } catch (error) {
            console.error(`Error fetching ${feed.source}:`, error);
          }
        }

        // Sort by date and take most recent 15
        const sortedNews = allNews
          .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
          .slice(0, 15);

        // Add fallback news if no feeds loaded
        if (sortedNews.length === 0) {
          const fallbackNews = [
            { title: "24365.News platform launches with AI-powered video categorization", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
            { title: "Citizen journalism network expands across all 50 states", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
            { title: "Breaking: Traditional media disrupted by distributed news model", source: "24365.News", link: "https://24365.news", pubDate: new Date().toISOString() },
          ];
          setNews(fallbackNews);
        } else {
          setNews(sortedNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    // Refresh every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
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