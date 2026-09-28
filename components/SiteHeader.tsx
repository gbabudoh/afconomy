import Link from "next/link";
import TerminalSearch from "@/components/TerminalSearch";

export default function SiteHeader({ canPublish = false }: { canPublish?: boolean }) {
  return (
    <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-md border-b border-af-border">
      <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="font-black tracking-tight text-lg shrink-0">
          AF<span className="text-af-red">CONOMY</span>
        </Link>
        <div className="flex-1 flex justify-center">
          <TerminalSearch />
        </div>
        <Link
          href="/live"
          className="flex items-center gap-1.5 shrink-0 text-xs font-bold text-white bg-af-red shadow-sm shadow-af-red/30 hover:bg-red-600 px-3 py-1.5 rounded-full"
        >
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Live TV
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-500">
          <Link href="/news" className="hover:text-slate-900">Wire</Link>
          {canPublish && (
            <Link href="/studio" className="hover:text-slate-900">Studio</Link>
          )}
          <Link href="/account" className="hover:text-slate-900">Account</Link>
          {canPublish && (
            <Link href="/admin/publish" className="text-af-red hover:text-slate-900">Publish</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
