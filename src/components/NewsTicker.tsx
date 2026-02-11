"use client";

import React from "react";

const newsItems = [
  "ESPN: Bad Bunny's Super Bowl halftime show breaks viewership records with 128.2M viewers",
  "Politico: GOP congressmen call for investigation into Super Bowl halftime show content",
  "NBC Sports: Winter Olympics 2026 ice hockey tournament enters final rounds",
  "Reuters: Federal Reserve signals potential rate adjustments for Q2 2026",
  "TechCrunch: Major cybersecurity breach at tech firm affects 2M users nationwide",
  "CNN: Supreme Court hears arguments on AI regulation framework legislation",
  "BBC: Climate summit in Dubai reaches historic emissions agreement",
  "Space News: SpaceX announces Mars mission crew selection for 2027 launch"
];

export default function NewsTicker() {
  return (
    <section className="bg-red-950/20 border-y border-red-800/30 overflow-hidden">
      <div className="py-4">
        <div className="flex items-center gap-6">
          <div className="bg-red-700 text-white px-4 py-2 text-base font-bold rounded shrink-0 ml-4">
            LIVE NEWS ({newsItems.length})
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="ticker-2026">
              <div className="ticker-track">
                {newsItems.map((item, index) => (
                  <div key={`first-${index}`} className="ticker-item">
                    <span className="text-red-300 font-semibold">
                      {item.split(':')[0]}:
                    </span>
                    <span className="text-white ml-2">
                      {item.split(':').slice(1).join(':').trim()}
                    </span>
                    <span className="text-red-400 text-lg ml-4">•</span>
                  </div>
                ))}
                {newsItems.map((item, index) => (
                  <div key={`second-${index}`} className="ticker-item">
                    <span className="text-red-300 font-semibold">
                      {item.split(':')[0]}:
                    </span>
                    <span className="text-white ml-2">
                      {item.split(':').slice(1).join(':').trim()}
                    </span>
                    <span className="text-red-400 text-lg ml-4">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}