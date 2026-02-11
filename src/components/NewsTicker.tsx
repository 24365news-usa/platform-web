"use client";

import { useEffect, useRef } from "react";

const NEWS_ITEMS = [
  "ESPN: BREAKING: Bad Bunny's Super Bowl halftime show breaks viewership records",
  "Politico: DEVELOPING: GOP congressmen call for investigation into halftime show", 
  "NBC Sports: LIVE: Winter Olympics 2026 ice hockey tournament enters final rounds",
  "Reuters: ALERT: Federal Reserve signals potential rate adjustments for Q2 2026",
  "TechCrunch: URGENT: Major cybersecurity breach affects 2M users nationwide",
  "CNN: NOW: Supreme Court hears arguments on AI regulation framework",
  "BBC: BREAKING: Climate summit reaches historic emissions agreement",
  "Space News: JUST IN: SpaceX announces Mars mission crew selection for 2027",
];

export default function NewsTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    // Create the scrolling text
    const newsText = NEWS_ITEMS.join("  •  ") + "  •  " + NEWS_ITEMS.join("  •  ");
    ticker.innerHTML = `<span style="white-space: nowrap; color: white;">${newsText}</span>`;

    let position = ticker.offsetWidth;
    const span = ticker.querySelector('span') as HTMLElement;

    const scroll = () => {
      position -= 1; // Move 1 pixel left per frame
      span.style.transform = `translateX(${position}px)`;
      
      // Reset when fully scrolled
      if (position <= -span.offsetWidth / 2) {
        position = ticker.offsetWidth;
      }
    };

    const interval = setInterval(scroll, 20); // ~50fps

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-red-950/20 border-y border-red-800/30 overflow-hidden">
      <div className="py-4">
        <div className="flex items-center gap-6">
          <div className="bg-red-700 text-white px-4 py-2 text-base font-bold rounded shrink-0 ml-4">
            LIVE NEWS (8)
          </div>
          <div className="flex-1 overflow-hidden h-6">
            <div ref={tickerRef} className="h-full relative"></div>
          </div>
        </div>
      </div>
    </section>
  );
}