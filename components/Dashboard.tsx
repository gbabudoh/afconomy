"use client";

import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import LiveInteractions from "./LiveInteractions";
import NewsFeed from "./NewsFeed";
import { TrendingUp, BarChart3, Globe, Play, X, MessageCircle, Newspaper } from "lucide-react";

const TVPlayer = dynamic(() => import("./TVPlayer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-secondary/5">
      <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface DashboardProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Dashboard({ children, activeTab, onTabChange }: DashboardProps) {
  const [showMobilePanel, setShowMobilePanel] = useState<"tv" | "news" | "chat" | null>(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "markets", label: "Markets", icon: BarChart3 },
    { id: "deep-dive", label: "Analysis", icon: Globe },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full bg-background overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden sticky top-0 z-30 bg-background border-b border-border">
          <div className="flex overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-secondary hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden lg:block sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-6 py-4">
            <div className="flex gap-1 bg-secondary/5 p-1 rounded-lg border border-secondary/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? "bg-card text-primary shadow-sm border border-primary/10"
                      : "text-secondary hover:text-foreground hover:bg-secondary/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {children}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border safe-area-pb">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setShowMobilePanel("tv")}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-secondary/10 transition-colors min-w-[60px]"
            >
              <div className="relative">
                <Play className="h-5 w-5 text-primary" />
                <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              </div>
              <span className="text-[10px] font-medium text-secondary">Live TV</span>
            </button>
            <button
              onClick={() => setShowMobilePanel("news")}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-secondary/10 transition-colors min-w-[60px]"
            >
              <Newspaper className="h-5 w-5 text-secondary" />
              <span className="text-[10px] font-medium text-secondary">News</span>
            </button>
            <button
              onClick={() => setShowMobilePanel("chat")}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-secondary/10 transition-colors min-w-[60px]"
            >
              <MessageCircle className="h-5 w-5 text-secondary" />
              <span className="text-[10px] font-medium text-secondary">Chat</span>
            </button>
          </div>
        </div>
      </main>

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:block w-80 xl:w-96 border-l border-border bg-secondary/5 overflow-y-auto flex-shrink-0">
        <div className="p-6 space-y-6">
          {/* Live TV Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">Live TV</h3>
              <div className="flex items-center gap-1.5 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Live</span>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden bg-black aspect-video shadow-lg ring-1 ring-border">
              <TVPlayer />
            </div>

            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <p className="text-sm font-semibold text-foreground">Nigerian Market Close</p>
              <p className="text-xs text-secondary mt-1">Analyzing daily gains in the NGX</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-medium text-secondary">14:00 - 15:30 GMT</span>
                <button className="text-primary hover:underline font-semibold">Set Reminder</button>
              </div>
            </div>
          </div>

          {/* News Feed */}
          <NewsFeed />

          {/* Live Interactions */}
          <LiveInteractions />
        </div>
      </aside>

      {/* Mobile Slide-up Panel */}
      {showMobilePanel && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom duration-300">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-foreground">
              {showMobilePanel === "tv" && "Live TV"}
              {showMobilePanel === "news" && "Market News"}
              {showMobilePanel === "chat" && "Live Chat & Polls"}
            </h2>
            <button
              onClick={() => setShowMobilePanel(null)}
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-secondary" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {showMobilePanel === "tv" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">Live Stream</h3>
                  <div className="flex items-center gap-1.5 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Live</span>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden bg-black aspect-video shadow-lg">
                  <TVPlayer />
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">Nigerian Market Close</p>
                  <p className="text-xs text-secondary mt-1">Analyzing daily gains in the NGX</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-medium text-secondary">14:00 - 15:30 GMT</span>
                    <button className="text-primary hover:underline font-semibold">Set Reminder</button>
                  </div>
                </div>
              </div>
            )}

            {showMobilePanel === "news" && <NewsFeed />}
            {showMobilePanel === "chat" && <LiveInteractions />}
          </div>
        </div>
      )}
    </div>
  );
}
