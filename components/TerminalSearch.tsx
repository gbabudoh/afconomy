"use client";

import React, { useState, useEffect } from "react";
import { Meilisearch } from "meilisearch";
import { Search, FileText, Loader2 } from "lucide-react";
import Link from "next/link";

// Uses the public read-only search key — safe to expose in the browser
const client = new Meilisearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST ?? "http://localhost:7700",
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY ?? "searchKey123",
});

interface SearchHit {
  id: string;
  title: string;
  slug: string;
  region: string;
  category: string;
}

export default function TerminalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setOpen(false);
      return;
    }

    const debounce = setTimeout(async () => {
      setIsSearching(true);
      try {
        const index = client.index("articles");
        const res = await index.search<SearchHit>(query, { limit: 5 });
        setResults(res.hits);
        setOpen(true);
      } catch {
        // Meilisearch may not be running in dev — fail silently
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 150);

    return () => clearTimeout(debounce);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function close() {
      setOpen(false);
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div
      className="relative w-full max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative">
        {isSearching ? (
          <Loader2 className="w-3.5 h-3.5 absolute left-3 top-2.5 text-blue-500 animate-spin" />
        ) : (
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
        )}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search policies, tickers, regions…"
          className="bg-af-bg border border-af-border text-xs rounded-lg pl-9 pr-4 py-2 w-full focus:outline-none focus:border-af-red/60 transition text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Results dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-af-panel border border-af-border rounded-xl shadow-panel overflow-hidden z-50 p-2 space-y-1">
          <div className="text-[10px] font-bold text-slate-500 px-2.5 py-1 uppercase tracking-wider">
            Matching Analytical Briefs
          </div>
          {results.map((hit) => (
            <Link
              key={hit.id}
              href={`/news/${hit.slug}`}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-af-bg transition group"
            >
              <div className="p-1.5 bg-af-bg border border-af-border rounded-md text-blue-600 group-hover:text-blue-700">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-800 group-hover:text-slate-900 transition truncate">
                  {hit.title}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium mt-0.5">
                  <span className="text-blue-600 font-bold uppercase">
                    {hit.region}
                  </span>
                  <span>·</span>
                  <span>{hit.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
