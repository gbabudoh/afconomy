"use client";

import { ReactNode, useState } from "react";
import { Menu, X, TrendingUp, BarChart3, Globe, Play, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import LiveInteractions from "./LiveInteractions";
import NewsFeed from "./NewsFeed";

const TVPlayer = dynamic(() => import("./TVPlayer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-secondary/5 rounded-lg">
      <div className="h-8 w-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface MobileLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MobileLayout({ children, activeTab, onTabChange }: MobileLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLivePanel, setShowLivePanel] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "markets", label: "Markets", icon: BarChart3 },
    { id: "deep-dive", label: "Analysis", icon: Globe },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-background">
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden sticky top-16 z-40 bg-background border-b border-border">
        <div className="flex overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Primary Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Desktop Tab Navigation */}
          <div className="hidden lg:block sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="px-6 py-4">
              <div className="flex gap-1 bg-secondary/5 p-1 rounded-lg border border-secondary/10 max-w-md">
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
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {children}
            </div>
          </div>
        </main>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-80 xl:w-96 border-l border-border bg-secondary/5 flex-col">
          <div className="sticky top-16 p-6 space-y-6 h-[calc(100vh-64px)] overflow-y-auto">
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
      </div>

      {/* Mobile Live Panel Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowLivePanel(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-all"
        >
          <Play className="h-4 w-4" />
          <span className="text-sm font-medium">Live TV</span>
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        </button>
      </div>

      {/* Mobile Live Panel */}
      {showLivePanel && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background">
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Live TV & Updates</h2>
            <button
              onClick={() => setShowLivePanel(false)}
              className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-secondary" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
            {/* Live TV */}
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

            {/* Mobile News Feed */}
            <NewsFeed />

            {/* Mobile Live Interactions */}
            <LiveInteractions />
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation for Quick Actions */}
      <div className="lg:hidden sticky bottom-0 bg-background border-t border-border p-2">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setShowLivePanel(true)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary/10 transition-colors"
          >
            <Play className="h-4 w-4 text-secondary" />
            <span className="text-xs text-secondary">Live TV</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary/10 transition-colors">
            <MessageCircle className="h-4 w-4 text-secondary" />
            <span className="text-xs text-secondary">Chat</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary/10 transition-colors">
            <Globe className="h-4 w-4 text-secondary" />
            <span className="text-xs text-secondary">News</span>
          </button>
        </div>
      </div>
    </div>
  );
}