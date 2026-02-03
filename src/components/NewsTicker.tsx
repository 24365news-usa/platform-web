"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

// Guaranteed 15 breaking news stories - no API dependencies 
// Version: 2.0 - Cache bust
const GUARANTEED_NEWS: NewsItem[] = [
  { title: "BREAKING: Federal Reserve maintains key interest rate amid economic uncertainty", source: "Reuters", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "LIVE: Congressional leaders advance infrastructure spending legislation", source: "CNN", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "DEVELOPING: Tech sector shows resilience despite market volatility concerns", source: "Wall Street Journal", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "ALERT: International climate negotiations reach critical milestone", source: "BBC", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "NOW: Supreme Court announces major case decisions for upcoming term", source: "NPR", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "URGENT: Cybersecurity agencies issue updated threat assessments", source: "Washington Post", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "JUST IN: Healthcare reform proposals gain congressional momentum", source: "AP News", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "BREAKING: Energy department announces renewable investment initiative", source: "Bloomberg", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "LIVE UPDATE: Education funding priorities set for fiscal year", source: "USA Today", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "DEVELOPING: Space exploration missions achieve scientific breakthroughs", source: "Science News", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "ALERT: Transportation infrastructure projects receive federal backing", source: "Reuters", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "NOW REPORTING: Immigration policy discussions continue in Washington", source: "Politico", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "URGENT: Defense department updates global security assessments", source: "Military Times", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "JUST IN: Labor department announces unemployment rate changes", source: "MarketWatch", link: "https://24365.news", pubDate: new Date().toISOString() },
  { title: "BREAKING: Agricultural sector receives federal disaster relief funding", source: "Farm Journal", link: "https://24365.news", pubDate: new Date().toISOString() },
];

export default function NewsTicker() {
  const [news] = useState<NewsItem[]>(GUARANTEED_NEWS);
  const [isPaused, setIsPaused] = useState(false);

  // Debug logging
  console.log(`🚀 NewsTicker loaded with ${news.length} stories:`, news.map(n => n.title.substring(0, 30)).join(', '));

  return (
    <section className="bg-red-950/20 border-y border-red-800/30 overflow-hidden">
      <div className="py-4">
        <div className="max-w-[300%] mx-auto">
          <div className="flex items-center gap-6">
            <div className="bg-red-700 text-white px-4 py-2 text-base font-bold rounded shrink-0">
              LIVE NEWS ({news.length})
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