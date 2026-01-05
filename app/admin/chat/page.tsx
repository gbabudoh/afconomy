"use client";

import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Trash2, 
  Shield, 
  User, 
  Clock, 
  Search, 
  AlertTriangle,
  Terminal,
  Filter,
  RefreshCw,
  X
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useRef } from "react";

interface Message {
  id: string;
  user: string;
  text: string;
  isAdmin: boolean;
  timestamp: string;
  author?: {
     name: string | null;
     email: string;
     role: string;
  };
}

export default function ChatModeration() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const socketRef = useRef<Socket | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/chat?page=${page}&limit=50`);
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  useEffect(() => {
    // Connect Socket for Real-time Moderation
    socketRef.current = io("http://localhost:3001");

    socketRef.current.on("receive-message", (message: Message) => {
      setMessages(prev => [message, ...prev.slice(0, 49)]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Terminate this transmission signal permanently?")) return;
    try {
      const res = await fetch("/api/admin/chat", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.user.toLowerCase().includes(search.toLowerCase()) || 
    m.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Signal <span className="text-primary italic">Moderation</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-bold opacity-60">Live Transmission Logs & Security Pruning</p>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={fetchMessages}
             className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-500 cursor-pointer"
             title="Synchronize Logs"
           >
             <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
           </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Search className="h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter live transmissions..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-900 focus:outline-none w-full placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Network Active</span>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                   <Filter className="h-3 w-3 text-slate-400" />
                   <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Global Feed</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[700px]">
           <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 sticky top-0 z-20">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 w-1/4">Transmitter</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Signal Content</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 w-32">Temporal</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right w-24">Lock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && messages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                       <Terminal className="h-8 w-8 text-primary/20 mx-auto mb-4 animate-bounce" />
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Decrypting Logs...</p>
                    </td>
                  </tr>
                ) : filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest opacity-30">Silence in the sector.</td>
                  </tr>
                ) : (
                  filteredMessages.map((msg) => (
                    <tr key={msg.id} className={`hover:bg-slate-50 transition-colors group ${msg.isAdmin ? 'bg-primary/5' : ''}`}>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${msg.isAdmin ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                               {msg.isAdmin ? <Shield className="h-5 w-5" /> : <User className="h-5 w-5" />}
                            </div>
                            <div className="flex flex-col">
                               <span className="font-bold text-sm tracking-tight text-slate-900">{msg.user}</span>
                               <span className="text-[9px] font-black uppercase tracking-widest opacity-40 text-slate-500">{msg.author?.role || 'EXTERNAL'}</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-6 font-medium text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                         <div className="max-w-2xl break-words">
                            {msg.text}
                         </div>
                      </td>
                      <td className="px-6 py-6">
                         <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="h-3 w-3" />
                            <span className="text-[10px] font-bold">
                               {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         {!msg.isAdmin && (
                            <button 
                              onClick={() => handleDelete(msg.id)}
                              className="h-9 w-9 flex items-center justify-center rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                            >
                               <Trash2 className="h-4 w-4" />
                            </button>
                         )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
           </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
           <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4">
              Sector Page {page} of {totalPages}
           </div>
           <div className="flex items-center gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 disabled:opacity-20 disabled:pointer-events-none transition-all text-slate-500 cursor-pointer"
              >
                 Prev Area
              </button>
              <button 
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-[0_4px_15px_rgba(234,179,8,0.2)] cursor-pointer"
              >
                 Next Area
              </button>
           </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-2xl">
         <AlertTriangle className="h-5 w-5 text-primary" />
         <p className="text-[11px] text-yellow-800 font-bold leading-relaxed">
            Standard Operating Procedure: Use signal termination only for protocol violations or security breaches. All administrative actions are logged in the sovereign database.
         </p>
      </div>
    </div>
  );
}
