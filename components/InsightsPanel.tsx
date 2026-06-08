"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, ShieldCheck, TrendingUp, MessageSquare, X } from "lucide-react";
import io from "socket.io-client";

interface Insight {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  isVerified: boolean;
  role: string;
}

const MOCK_INSIGHTS: Insight[] = [
  { id: "1", user: "Dr. Amara Okoro", text: "Nigeria's recent policy shift in the energy sector is likely to stabilize the Naira by Q4.", timestamp: "2m ago", isVerified: true, role: "Senior Economist" },
  { id: "2", user: "Kofi Mensah", text: "Watching the port activity in Tema. Trade volumes are up 12% year-on-year.", timestamp: "15m ago", isVerified: true, role: "Trade Analyst" },
  { id: "3", user: "Sarah Jallow", text: "Gambia's tourism sector is showing strong recovery signals. High demand for FX anticipated.", timestamp: "45m ago", isVerified: true, role: "Market Strategist" },
];

export default function InsightsPanel({ sectorId }: { sectorId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [insights, setInsights] = useState<Insight[]>(MOCK_INSIGHTS);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then(res => res.json())
      .then(data => { if (data.user) setCurrentUser(data.user); })
      .catch(() => {});

    // Connect to the existing socket server on port 3001
    socketRef.current = io("http://localhost:3001");

    socketRef.current.on("receive-message", (data: any) => {
      const newInsight: Insight = {
        id: Math.random().toString(),
        user: data.user || "Anonymous",
        text: data.text,
        timestamp: "Just now",
        isVerified: data.isAdmin || false,
        role: data.isAdmin ? "Verified Professional" : "Contributor"
      };
      setInsights(prev => [newInsight, ...prev]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    socketRef.current.emit("send-message", {
      user: currentUser?.name || "Guest",
      text: newMessage,
      isAdmin: false
    });
    
    setNewMessage("");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-64 right-4 lg:bottom-24 lg:right-6 h-14 w-14 rounded-2xl bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-40 group"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute right-full mr-4 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Market Insights
        </span>
      </button>

      {/* Insights Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white/95 backdrop-blur-3xl shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-50 border-l border-black/5 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5 flex items-center justify-between bg-white/50">
              <div>
                <h3 className="font-black text-xl tracking-tight uppercase">Insights</h3>
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{sectorId} Discussion</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-xl transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar" ref={scrollRef}>
              {insights.map((insight) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={insight.id} 
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-black/5 flex items-center justify-center">
                        <User className="h-4 w-4 text-black/40" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-black tracking-tight">{insight.user}</span>
                          {insight.isVerified && <ShieldCheck className="h-3 w-3 text-primary" />}
                        </div>
                        <span className="text-[9px] font-bold text-black/30 uppercase tracking-tighter">{insight.role}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-black/20 uppercase">{insight.timestamp}</span>
                  </div>
                  <div className="glass-card p-4 rounded-2xl bg-black/2 border border-black/3">
                    <p className="text-xs leading-relaxed font-medium text-black/70 italic">"{insight.text}"</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white/80 border-t border-black/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Share your insight..."
                  className="w-full bg-black/3 border-none rounded-2xl py-4 pl-6 pr-14 text-xs font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-[9px] text-black/30 font-bold uppercase tracking-widest text-center">
                Posting as <span className="text-primary">{currentUser ? currentUser.name : "Guest"}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
