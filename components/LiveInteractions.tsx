"use client";

import { useState, useEffect, useRef } from "react";
import { BarChart2, Send, MessageCircle, User } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string | Date;
  isAdmin?: boolean;
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export default function LiveInteractions() {
  const [activeTab, setActiveTab] = useState<"chat" | "polls">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [poll, setPoll] = useState<Poll | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize Socket and fetch data
  useEffect(() => {
    // 1. Fetch Chat History
    fetch("/api/chat/history")
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("Error fetching chat history:", err));

    // 2. Fetch Poll Status
    fetch("/api/polls/status")
      .then(res => res.json())
      .then(data => setPoll(data))
      .catch(err => console.error("Error fetching poll status:", err));

    // 3. Connect Socket
    socketRef.current = io("http://localhost:3001");

    socketRef.current.on("receive-message", (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !socketRef.current) return;

    socketRef.current.emit("send-message", {
      user: "Guest", // For now, could be dynamic later
      text: newMsg,
      isAdmin: false
    });

    setNewMsg("");
  };

  const handleVote = async (optionId: string) => {
    if (hasVoted || !poll) return;
    
    try {
      const res = await fetch("/api/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId }),
      });

      if (res.ok) {
        setHasVoted(true);
        // Refresh poll status to show latest votes
        const updatedPollRes = await fetch("/api/polls/status");
        const updatedPoll = await updatedPollRes.json();
        setPoll(updatedPoll);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden shadow-sm">
      {/* Tabs */}
      <div className="flex border-b border-border p-1 bg-secondary/5">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all rounded-md ${
            activeTab === "chat" ? "bg-card text-primary shadow-sm ring-1 ring-border" : "text-secondary hover:text-foreground"
          }`}
        >
          <MessageCircle className="h-4 w-4" />
          CHAT
        </button>
        <button
          onClick={() => setActiveTab("polls")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all rounded-md ${
            activeTab === "polls" ? "bg-card text-primary shadow-sm ring-1 ring-border" : "text-secondary hover:text-foreground"
          }`}
        >
          <BarChart2 className="h-4 w-4" />
          POLLS
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-64 lg:h-80 xl:h-96 min-h-0">
        {activeTab === "chat" ? (
          <>
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const date = typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp;
                return (
                  <div key={msg.id} className="flex gap-2 animate-in fade-in slide-in-from-bottom-1">
                    <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.isAdmin ? 'bg-primary/20' : 'bg-secondary/10'}`}>
                      <User className={`h-4 w-4 ${msg.isAdmin ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${msg.isAdmin ? 'text-primary' : 'text-foreground'}`}>
                          {msg.user}
                        </span>
                        <span className="text-[10px] text-secondary">
                          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed break-words">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-border bg-card">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  placeholder="Say something..."
                  className="flex-1 bg-secondary/5 border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
                />
                <button
                  type="submit"
                  disabled={!newMsg.trim()}
                  className="h-9 w-9 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:bg-secondary transition-all shadow-md active:scale-95"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-5 space-y-6 overflow-y-auto">
            {poll ? (
              <>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded inline-block">Active Poll</span>
                  <h4 className="text-sm font-bold text-foreground leading-tight">{poll.question}</h4>
                </div>

                <div className="space-y-4">
                  {poll.options.map((option) => {
                    const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        disabled={hasVoted}
                        className={`w-full group relative text-left p-3 rounded-lg border transition-all ${
                          hasVoted ? 'cursor-default border-border' : 'cursor-pointer border-border hover:border-primary/30 hover:bg-primary/[0.02]'
                        }`}
                      >
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{option.text}</span>
                          {hasVoted && (
                            <span className="text-xs font-bold text-primary">{Math.round(percentage)}%</span>
                          )}
                        </div>
                        {hasVoted && (
                          <div 
                            className="absolute top-0 left-0 h-full bg-primary/10 rounded-lg transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-secondary/10">
                  <span className="text-xs text-secondary">{poll.totalVotes} total votes</span>
                  {hasVoted && (
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                      <div className="h-1 w-1 rounded-full bg-emerald-600 animate-pulse" />
                      Live update
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-sm text-secondary">Loading current poll...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
