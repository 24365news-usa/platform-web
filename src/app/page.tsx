import Link from "next/link";
import { Video, Users, Globe, ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#1a2744] text-white">
      {/* Header */}
      <header className="border-b border-blue-900/50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-600">24365</span>
            <span className="text-2xl font-light text-white">.News</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="text-slate-300 hover:text-white transition"
            >
              Dashboard
            </Link>
            <Link 
              href="/sign-in"
              className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              Become a Contributor
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main>
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          {/* Subtle stars accent */}
          <div className="flex justify-center gap-2 mb-6">
            <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
            <Star className="w-4 h-4 text-white fill-white" />
            <Star className="w-4 h-4 text-red-500 fill-red-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            News That Never Sleeps
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            A distributed network of citizen journalists covering stories.
            <br />
            <span className="text-red-500 font-semibold">24 hours a day</span>, 
            <span className="text-blue-400 font-semibold">365 days a year</span>.
            <br />
            Real people. Real stories. Real news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/watch"
              className="bg-red-700 hover:bg-red-600 px-8 py-4 rounded-lg text-lg font-semibold transition inline-flex items-center justify-center gap-2"
            >
              Watch Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/sign-up"
              className="border-2 border-blue-600 hover:bg-blue-600/20 px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Join Our Network
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a2744]/80 border border-blue-900/50 rounded-xl p-8 hover:border-red-700/50 transition">
              <Video className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload Your Story</h3>
              <p className="text-slate-400">
                Share breaking news, local events, and stories that matter. 
                Our platform makes it easy to publish professional content.
              </p>
            </div>
            <div className="bg-[#1a2744]/80 border border-blue-900/50 rounded-xl p-8 hover:border-blue-500/50 transition">
              <Users className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Build Your Audience</h3>
              <p className="text-slate-400">
                Connect with viewers who care about real journalism. 
                Grow your following through quality reporting.
              </p>
            </div>
            <div className="bg-[#1a2744]/80 border border-blue-900/50 rounded-xl p-8 hover:border-red-700/50 transition">
              <Globe className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reach Everywhere</h3>
              <p className="text-slate-400">
                Your content distributed across all major platforms. 
                One upload, maximum reach.
              </p>
            </div>
          </div>
        </section>

        {/* CTA - gradient from red to blue */}
        <section className="bg-gradient-to-r from-red-900/20 via-[#1a2744] to-blue-900/20 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              The Future of News is Distributed
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              Traditional media is failing. We&apos;re building something different — 
              a network of independent voices covering every corner of America and beyond.
            </p>
            <Link 
              href="/sign-up"
              className="bg-gradient-to-r from-red-700 to-blue-700 hover:from-red-600 hover:to-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition inline-block"
            >
              Apply to Join
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/watch" className="hover:text-white transition">Watch</Link>
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/apply" className="hover:text-white transition">Join Us</Link>
          </div>
          <p className="text-center text-slate-500">
            &copy; 2026 24365.News — A Wyoming Corporation
          </p>
        </div>
      </footer>
    </div>
  );
}
