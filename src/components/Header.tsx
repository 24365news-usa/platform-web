import Link from "next/link";

interface HeaderProps {
  showDashboard?: boolean;
  showSearch?: boolean;
}

export default function Header({ 
  showDashboard = true,
  showSearch = false 
}: HeaderProps) {
  return (
    <header className="border-b border-blue-900/50 sticky top-0 bg-[#0a1628]/95 backdrop-blur z-10">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl font-bold text-red-600">24365</span>
          <span className="text-2xl font-light text-white">.News</span>
        </Link>

        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href="/watch"
            className="text-slate-300 hover:text-white transition"
          >
            Watch
          </Link>
          {showDashboard && (
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-white transition"
            >
              Dashboard
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
