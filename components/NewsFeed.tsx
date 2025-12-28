"use client";

import { useMemo, useState } from "react";
import { newsData, NewsItem } from "@/lib/newsData";
import { useCountry } from "@/lib/CountryContext";
import { ArrowUpRight, X, Clock, Share2, Bookmark } from "lucide-react";

export default function NewsFeed() {
  const { selectedCountries } = useCountry();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    // ... same filtering logic
    if (selectedCountries.length === 0) {
      return newsData.filter(item => !item.countryCode).slice(0, 5);
    }
    const filtered = newsData.filter(item => 
      !item.countryCode || selectedCountries.includes(item.countryCode)
    );
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCountries]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-foreground">Market News</h3>
        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 uppercase tracking-tighter">
          Live Feed
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
        {filteredNews.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedNews(item)}
            className="group flex gap-3 p-3 rounded-xl border border-border bg-card hover:bg-secondary/5 hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="p-2 h-fit rounded-lg bg-secondary/5 group-hover:bg-primary/5 transition-colors">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
                  {item.category}
                </span>
                <span className="text-[9px] text-secondary font-medium">{item.date}</span>
              </div>
              <h4 className="text-xs font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h4>
              <p className="text-[10px] text-secondary line-clamp-1 group-hover:line-clamp-none transition-all">
                {item.summary}
              </p>
            </div>
            <ArrowUpRight className="h-3 w-3 text-secondary group-hover:text-primary transition-colors shrink-0" />
          </div>
        ))}
      </div>

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
                  <selectedNews.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {selectedNews.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-secondary mt-0.5">
                    <Clock className="h-3 w-3" />
                    {selectedNews.date}
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
                  {selectedNews.summary}
                </p>
                <p className="text-base">
                  {selectedNews.fullContent || "Full analysis for this report is being updated in real-time. Please check back shortly for deeper insights from our regional lead analysts."}
                </p>
                <p className="text-base pt-4">
                  The Afconomy Macro Engine continues to track these developments. Subscribers can view the full data breakdown in our &quot;Deep Dive&quot; section.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Read Full Report
                </button>
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
