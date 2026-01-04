"use client";

import { useMemo, useState } from "react";
import { useNews } from "@/lib/hooks/useRealTimeData";
import { useCountry } from "@/lib/CountryContext";
import { africanCountries } from "@/lib/countries";
import { ArrowUpRight, X, Clock, Share2, Bookmark, Globe, Loader2, RefreshCw } from "lucide-react";

export default function NewsFeed() {
  const { selectedCountries } = useCountry();
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  
  // Get country name for API call
  const countryName = selectedCountries.length === 1 ? 
    africanCountries.find(c => c.code === selectedCountries[0])?.name : 
    undefined;
  
  // Fetch real-time news
  const { articles, loading, error, lastUpdated, refetch } = useNews(countryName, 20);

  const filteredNews = useMemo(() => {
    if (loading || articles.length === 0) {
      return [];
    }

    let filtered = articles;

    // If specific countries selected, filter by country codes
    if (selectedCountries.length > 0) {
      filtered = articles.filter(article => 
        !article.countryCode || 
        selectedCountries.includes(article.countryCode) ||
        selectedCountries.some(code => {
          const country = africanCountries.find(c => c.code === code);
          return country && (
            article.title.toLowerCase().includes(country.name.toLowerCase()) ||
            article.description.toLowerCase().includes(country.name.toLowerCase())
          );
        })
      );
    }

    // Sort by publication date
    return filtered
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 10); // Limit to 10 most recent
  }, [articles, selectedCountries, loading]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-foreground">Market News</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            disabled={loading}
            className="p-1 hover:bg-secondary/10 rounded transition-colors"
            title="Refresh news"
          >
            <RefreshCw className={`h-3 w-3 text-secondary ${loading ? 'animate-spin' : ''}`} />
          </button>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 uppercase tracking-tighter">
            {loading ? 'Loading...' : error ? 'Mock Data' : 'Live Feed'}
          </span>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="font-medium">Using Sample News Data</span>
          </div>
          <p className="text-xs mt-1 text-blue-600">
            Get live African economic news by adding your free NewsAPI key to .env
          </p>
        </div>
      )}

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-secondary">Loading latest news...</span>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-8 text-secondary">
            <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent news available</p>
            <button 
              onClick={refetch}
              className="text-xs text-primary hover:underline mt-1"
            >
              Try refreshing
            </button>
          </div>
        ) : (
          filteredNews.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group flex gap-3 p-3 rounded-xl border border-border bg-card hover:bg-secondary/5 hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className="p-2 h-fit rounded-lg bg-secondary/5 group-hover:bg-primary/5 transition-colors">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
                    {item.category}
                  </span>
                  <span className="text-[9px] text-secondary font-medium">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xs font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-[10px] text-secondary line-clamp-1 group-hover:line-clamp-none transition-all">
                  {item.description}
                </p>
                {item.source && (
                  <p className="text-[9px] text-secondary/70">
                    Source: {item.source.name}
                  </p>
                )}
              </div>
              <ArrowUpRight className="h-3 w-3 text-secondary group-hover:text-primary transition-colors shrink-0" />
            </div>
          ))
        )}
      </div>

      {lastUpdated && (
        <p className="text-xs text-secondary text-center">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      {/* Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <div 
            className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/5">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {selectedNews.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-secondary mt-0.5">
                    <Clock className="h-3 w-3" />
                    {new Date(selectedNews.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-secondary" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              <h2 className="text-2xl font-bold text-foreground leading-tight">
                {selectedNews.title}
              </h2>
              <div className="space-y-4 text-secondary leading-relaxed">
                <p className="text-lg font-medium text-foreground/80 italic border-l-4 border-primary/30 pl-4 py-1">
                  {selectedNews.description}
                </p>
                <p className="text-base">
                  {selectedNews.content || "Full analysis for this report is being updated in real-time. Please check back shortly for deeper insights from our regional lead analysts."}
                </p>
                {selectedNews.source && (
                  <p className="text-sm text-secondary/70 pt-2 border-t border-border">
                    Source: {selectedNews.source.name}
                  </p>
                )}
                <p className="text-base pt-4">
                  The Afconomy Macro Engine continues to track these developments. Subscribers can view the full data breakdown in our &quot;Deep Dive&quot; section.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <a
                  href={selectedNews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Read Full Article
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button className="p-2.5 border border-border rounded-xl hover:bg-secondary/5 transition-all">
                  <Share2 className="h-5 w-5 text-secondary" />
                </button>
                <button className="p-2.5 border border-border rounded-xl hover:bg-secondary/5 transition-all">
                  <Bookmark className="h-5 w-5 text-secondary" />
                </button>
              </div>
            </div>
          </div>
          {/* Backdrop Click */}
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedNews(null)} />
        </div>
      )}
    </div>
  );
}
