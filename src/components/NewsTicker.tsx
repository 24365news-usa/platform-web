"use client";

interface NewsItem {
  title: string;
  source: string;
}

// Simple news array - no complex logic
const NEWS_ITEMS: NewsItem[] = [
  { title: "BREAKING: Bad Bunny's Super Bowl halftime show breaks viewership records", source: "ESPN" },
  { title: "DEVELOPING: GOP congressmen call for investigation into halftime show", source: "Politico" },
  { title: "LIVE: Winter Olympics 2026 ice hockey tournament enters final rounds", source: "NBC Sports" },
  { title: "ALERT: Federal Reserve signals potential rate adjustments for Q2 2026", source: "Reuters" },
  { title: "URGENT: Major cybersecurity breach affects 2M users nationwide", source: "TechCrunch" },
  { title: "NOW: Supreme Court hears arguments on AI regulation framework", source: "CNN" },
  { title: "BREAKING: Climate summit reaches historic emissions agreement", source: "BBC" },
  { title: "JUST IN: SpaceX announces Mars mission crew selection for 2027", source: "Space News" },
];

export default function NewsTicker() {
  return (
    <section className="bg-red-950/20 border-y border-red-800/30 overflow-hidden">
      <div className="py-4">
        <div className="flex items-center gap-6">
          <div className="bg-red-700 text-white px-4 py-2 text-base font-bold rounded shrink-0 ml-4">
            LIVE NEWS ({NEWS_ITEMS.length})
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="ticker-container">
              <div className="ticker-content">
                {NEWS_ITEMS.map((item, index) => (
                  <span key={index} className="ticker-item">
                    <span className="text-red-300 font-semibold">{item.source}:</span>
                    <span className="text-white ml-2">{item.title}</span>
                    <span className="text-red-400 text-lg ml-6">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}