import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl font-bold text-red-500">24365</span>
            <span className="text-3xl font-light text-white">.News</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Join Our Network</h1>
          <p className="text-slate-400 mt-2">
            Become a citizen journalist
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm text-center">
              🚧 Registration opening soon — join the waitlist below
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p>Upload and distribute your content across all major platforms</p>
            </div>
            <div className="flex items-start gap-3 text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p>Join a network of independent journalists across 50 states</p>
            </div>
            <div className="flex items-start gap-3 text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p>Build your audience with our platform and community support</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email for Waitlist
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                disabled
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 cursor-not-allowed opacity-50"
              />
            </div>

            <button
              disabled
              className="w-full bg-slate-600 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Join Waitlist (Coming Soon)
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-red-500 hover:text-red-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-slate-400 hover:text-white transition inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
