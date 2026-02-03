import Link from "next/link";
import { Users, Video, Globe, Shield, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-500">24365</span>
            <span className="text-2xl font-light">.News</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/watch" className="text-slate-300 hover:text-white transition">
              Watch
            </Link>
            <Link href="/apply" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
              Join Us
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-red-500">24365</span>.News
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We&apos;re building the largest distributed network of citizen journalists 
            in America. Real news from real people, 24 hours a day, 365 days a year.
          </p>
        </section>

        {/* Mission */}
        <section className="bg-slate-800/50 border-y border-slate-700">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-slate-300 mb-4">
                  Traditional media has failed. Newsrooms are shrinking. Local coverage 
                  is disappearing. And trust in mainstream outlets has never been lower.
                </p>
                <p className="text-slate-300 mb-4">
                  We&apos;re building something different: a decentralized network of 
                  independent journalists covering every corner of America. From town 
                  halls to breaking news, our contributors are on the ground where 
                  stories happen.
                </p>
                <p className="text-slate-300">
                  No corporate filters. No editorial bias. Just real people reporting 
                  real news.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">50</div>
                  <div className="text-slate-400">States Covered</div>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
                  <div className="text-slate-400">Coverage</div>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">100%</div>
                  <div className="text-slate-400">Independent</div>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">0</div>
                  <div className="text-slate-400">Corporate Sponsors</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">People First</h3>
              <p className="text-slate-400 text-sm">
                Our journalists are citizens, not corporations. They live in the 
                communities they cover.
              </p>
            </div>
            <div className="text-center">
              <Video className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Unfiltered Truth</h3>
              <p className="text-slate-400 text-sm">
                Raw footage. Direct reporting. No spin rooms, no editorial rewrites.
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Everywhere</h3>
              <p className="text-slate-400 text-sm">
                From major cities to rural towns, we&apos;re building coverage that 
                reaches every community.
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Accountable</h3>
              <p className="text-slate-400 text-sm">
                Our contributors stand behind their work. Names attached, faces shown.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-red-600/10 border-y border-red-600/30">
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Revolution</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              Are you a journalist, videographer, or citizen with stories to tell? 
              We&apos;re looking for contributors in every state.
            </p>
            <Link
              href="/apply"
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-lg font-semibold transition inline-flex items-center gap-2"
            >
              Apply to Join <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Company info */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-slate-400">
            24365.News is a Wyoming corporation, founded in 2025.<br />
            Headquartered in the United States.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/watch" className="hover:text-white transition">Watch</Link>
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/apply" className="hover:text-white transition">Join Us</Link>
          </div>
          <p className="text-center text-slate-500 mt-4">
            &copy; 2025 24365.News — A Wyoming Corporation
          </p>
        </div>
      </footer>
    </div>
  );
}
