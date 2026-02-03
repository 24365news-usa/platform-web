"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function Navigation() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="border-b border-blue-900/50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-red-600">24365</span>
          <span className="text-2xl font-light text-white">.News</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/watch" 
            className="text-slate-300 hover:text-white transition"
          >
            Watch
          </Link>
          
          {isSignedIn ? (
            // Signed in: Show Dashboard and Sign Out
            <>
              <Link 
                href="/dashboard" 
                className="text-slate-300 hover:text-white transition"
              >
                Dashboard
              </Link>
              <Link 
                href="/upload" 
                className="text-slate-300 hover:text-white transition"
              >
                Upload
              </Link>
              <SignOutButton>
                <button className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </SignOutButton>
              <span className="text-sm text-slate-400">
                {user?.firstName || user?.emailAddresses[0]?.emailAddress || "User"}
              </span>
            </>
          ) : (
            // Signed out: Show Sign In and Join Us
            <>
              <Link 
                href="/sign-in" 
                className="text-slate-300 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Join Us
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}