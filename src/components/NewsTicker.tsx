export default function NewsTicker() {
  return (
    <section className="bg-red-950/20 border-y border-red-800/30 overflow-hidden">
      <div className="py-4">
        <div className="flex items-center gap-6">
          <div className="bg-red-700 text-white px-4 py-2 text-base font-bold rounded shrink-0 ml-4">
            LIVE BREAKING NEWS
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="news-scroll">
              <span className="news-text">
                ESPN: Bad Bunny Super Bowl breaks records • Politico: GOP investigates halftime show • NBC: Olympics hockey finals • Reuters: Fed rate signals • TechCrunch: Cyber breach affects 2M • CNN: Supreme Court AI case • BBC: Climate summit deal • Space News: Mars crew selection • 
                ESPN: Bad Bunny Super Bowl breaks records • Politico: GOP investigates halftime show • NBC: Olympics hockey finals • Reuters: Fed rate signals • TechCrunch: Cyber breach affects 2M • CNN: Supreme Court AI case • BBC: Climate summit deal • Space News: Mars crew selection •
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}