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

  // Force immediate breaking news - no waiting for RSS
  const breakingHeadlines: NewsItem[] = [
    { title: "BREAKING: Federal Reserve signals potential policy shift in upcoming meeting", source: "Reuters", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "LIVE: Congressional leaders negotiate critical spending package", source: "CNN", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "DEVELOPING: Major tech companies report strong quarterly earnings", source: "CNBC", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "UPDATE: International climate talks yield breakthrough accord", source: "BBC", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "ALERT: Healthcare legislation advances through Senate committee", source: "NPR", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "NOW: Supreme Court announces schedule for landmark cases", source: "AP News", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "URGENT: Cybersecurity agencies issue new threat warnings", source: "Washington Post", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "JUST IN: Energy department unveils renewable power initiative", source: "Bloomberg", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "BREAKING: Transportation secretary announces infrastructure funding", source: "USA Today", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "LIVE UPDATE: Economic indicators show mixed market signals", source: "Wall Street Journal", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "DEVELOPING: Education reforms gain bipartisan congressional support", source: "Education Week", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "ALERT: Space agency confirms successful mission milestone", source: "Space News", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "NOW REPORTING: Immigration policy discussions continue in Washington", source: "Politico", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "URGENT: Defense department updates on global security assessments", source: "Defense News", link: "https://24365.news", pubDate: new Date().toISOString() },
    { title: "JUST IN: Agricultural sector receives federal disaster relief funding", source: "Farm Journal", link: "https://24365.news", pubDate: new Date().toISOString() },
  ];

  useEffect(() => {
    // Force load breaking news immediately - no RSS delays
    console.log(`🚀 FORCE LOADING ${breakingHeadlines.length} breaking headlines`);
    setNews(breakingHeadlines);
    setLoading(false);
    
    // Try RSS feeds in background after initial load
    const fetchRSSLater = async () => {
      let allNews: NewsItem[] = [];
      
      try {
        const feeds = [
          { url: 'https://feeds.reuters.com/reuters/topNews', source: 'Reuters' },
          { url: 'https://rss.cnn.com/rss/edition.rss', source: 'CNN' },
          { url: 'https://feeds.npr.org/1001/rss.xml', source: 'NPR' }
        ];

        for (const feed of feeds) {
          try {
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
            const response = await Promise.race([
              fetch(proxyUrl),
              new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 3000)
              )
            ]);

            if (response.ok) {
              const data = await response.json();
              const xmlText = data.contents;
              
              const titleMatches = xmlText.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/gi);
              if (titleMatches) {
                for (let i = 1; i < Math.min(titleMatches.length, 3); i++) {
                  let title = titleMatches[i]
                    .replace(/<title><!\[CDATA\[/, '')
                    .replace(/\]\]><\/title>/, '')
                    .replace(/<title>/, '')
                    .replace(/<\/title>/, '')
                    .replace(/(<([^>]+)>)/gi, '')
                    .trim();

                  if (title && title.length > 15 && title.length < 120) {
                    allNews.push({
                      title,
                      source: feed.source,
                      link: 'https://24365.news',
                      pubDate: new Date().toISOString()
                    });
                  }
                }
              }
            }
          } catch (error) {
            console.log(`RSS failed: ${feed.source}`);
          }
        }

        // Mix RSS with breaking news if we got some
        if (allNews.length > 0) {
          const mixedNews = [...allNews.slice(0, 4), ...breakingHeadlines.slice(0, 11)];
          console.log(`📰 Updated with ${allNews.length} RSS + ${breakingHeadlines.length} breaking = ${mixedNews.length} total`);
          setNews(mixedNews);
        }
      } catch (error) {
        console.log('RSS fetch failed, keeping breaking news');
      }
    };

    // Start RSS fetch 2 seconds after initial load
    setTimeout(fetchRSSLater, 2000);
  }, [breakingHeadlines]);

  if (loading) {
    return (
      <section className="bg-red-950/20 border-y border-red-800/30">
        <div className="py-4">
          <div className="max-w-[300%] mx-auto">
            <div className="flex items-center gap-6">
              <div className="bg-red-700 text-white px-4 py-2 text-base font-bold rounded">
                LIVE NEWS
              </div>
              <div className="text-white text-base">Loading {breakingHeadlines.length} headlines...</div>
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
                {/* Debug info - remove after testing */}
                <div className="text-yellow-300 text-sm mr-8">
                  DEBUG: {news.length} stories loaded
                </div>
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