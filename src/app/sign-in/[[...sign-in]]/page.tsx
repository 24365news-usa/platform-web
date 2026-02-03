import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl font-bold text-red-500">24365</span>
            <span className="text-3xl font-light text-white">.News</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Sign In</h1>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm text-center">
              🚧 Authentication coming soon — we&apos;re setting up secure sign-in
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                disabled
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 cursor-not-allowed opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                disabled
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 cursor-not-allowed opacity-50"
              />
            </div>

            <button
              disabled
              className="w-full bg-slate-600 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Sign In (Coming Soon)
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-red-500 hover:text-red-400">
                Sign up
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
