import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
          <p className="text-slate-400 mt-2">
            Welcome back
          </p>
        </div>

        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-slate-800 border border-slate-700",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
              formFieldLabel: "text-white",
              formFieldInput: "bg-slate-700 border-slate-600 text-white",
              formButtonPrimary: "bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500",
              footerActionLink: "text-red-500 hover:text-red-400",
            }
          }}
        />

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
