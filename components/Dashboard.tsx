"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import LiveInteractions from "./LiveInteractions";

const TVPlayer = dynamic(() => import("./TVPlayer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-secondary/5">
      <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface DashboardProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Dashboard({ children, activeTab, onTabChange }: DashboardProps) {

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Left Column: Economic Data & Content (65%) */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 lg:w-[65%]">
        <div className="mb-8">
          <div className="flex gap-1 border-b border-border bg-secondary/5 rounded-t-lg p-1">
            {["overview", "markets", "deep-dive"].map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`flex-1 px-6 py-2.5 text-sm font-medium capitalize transition-all rounded-md relative ${
                  activeTab === tab
                    ? "bg-card text-primary shadow-sm border border-primary/10"
                    : "text-secondary hover:text-foreground hover:bg-secondary/10"
                }`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>

      {/* Right Column: Live TV & Interactions (35%) */}
      <aside className="lg:w-[35%] border-l border-border bg-secondary/5 flex flex-col">
        <div className="sticky top-16 p-6 space-y-6">
          <div className="rounded-xl overflow-hidden bg-secondary/10 aspect-video shadow-xl ring-1 ring-border">
            <TVPlayer />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">Live Now</h3>
              <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Live</span>
              </div>
            </div>
            
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/20 group">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Nigerian Market Close</p>
              <p className="text-xs text-secondary mt-1.5">Analyzing the daily gains in the NGX</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-medium text-secondary">14:00 - 15:30 GMT</span>
                <button className="text-primary hover:underline font-semibold hover:text-primary/80 transition-colors">Set Reminder</button>
              </div>
            </div>

            <LiveInteractions />
          </div>
        </div>
      </aside>
    </div>
  );
}
