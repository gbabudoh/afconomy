"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  PieChart,
  Target,
  Users,
  Save,
  PlusCircle,
  X
} from "lucide-react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  totalVotes: number;
  active: boolean;
  createdAt: string;
  options: PollOption[];
}

export default function PollsManagement() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  
  // Form states
  const [question, setQuestion] = useState("");
  const [optionInputs, setOptionInputs] = useState(["", ""]);

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/polls");
      const data = await res.json();
      if (res.ok) setPolls(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleAddOption = () => {
    if (optionInputs.length < 6) {
      setOptionInputs([...optionInputs, ""]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (optionInputs.length > 2) {
      setOptionInputs(optionInputs.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...optionInputs];
    newOptions[index] = value;
    setOptionInputs(newOptions);
  };

  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOptions = optionInputs.filter(opt => opt.trim() !== "");
    if (cleanOptions.length < 2) {
      alert("At least two valid options are required.");
      return;
    }

    try {
      const res = await fetch("/api/admin/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, options: cleanOptions }),
      });
      if (res.ok) {
        setIsCreatorOpen(false);
        setQuestion("");
        setOptionInputs(["", ""]);
        fetchPolls();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/polls", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: !currentStatus }),
      });
      if (res.ok) {
        setPolls(polls.map(p => p.id === id ? { ...p, active: !currentStatus } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePoll = async (id: string) => {
    if (!confirm("Confirm complete removal of this consensus protocol? All vote data will be permanently purged.")) return;
    try {
      const res = await fetch("/api/admin/polls", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchPolls();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Consensus <span className="text-primary italic">Protocols</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-bold opacity-60">Platform Polls & Collective Intelligence Gathering</p>
        </div>
        <button 
          onClick={() => setIsCreatorOpen(true)}
          className="px-6 py-3 bg-primary text-white font-black uppercase text-xs rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.25)] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Initialize New Protocol
        </button>
      </div>

      {/* Poll Creator Modal/Overlay */}
      {isCreatorOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-xl bg-[#DCDCDC] border border-slate-200 rounded-3xl overflow-hidden shadow-2xl border-t-4 border-t-primary">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-primary/10">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Protocol Initialization
                </h2>
                <button onClick={() => setIsCreatorOpen(false)} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleCreatePoll} className="p-8 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Primary Intelligence Question</label>
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm h-24 resize-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all font-bold tracking-tight text-slate-900"
                    placeholder="e.g., Which market trend should be prioritized for Q4 analysis?"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Response Options (Clearance Options)</label>
                  {optionInputs.map((opt, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex-1 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary/40">0{idx+1}</div>
                        <input 
                          value={opt}
                          onChange={(e) => handleOptionChange(idx, e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 pl-10 text-xs focus:border-primary/40 transition-all text-slate-900"
                          placeholder={`Option 0${idx+1} descriptor...`}
                          required
                        />
                      </div>
                      {optionInputs.length > 2 && (
                        <button 
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="p-3 text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {optionInputs.length < 6 && (
                    <button 
                      type="button"
                      onClick={handleAddOption}
                      className="w-full py-3 border border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Append Additional Option
                    </button>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-200 flex gap-4">
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(234,179,8,0.2)] cursor-pointer"
                  >
                    Activate Protocol
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsCreatorOpen(false)}
                    className="px-6 py-4 bg-white text-slate-500 font-bold uppercase text-[10px] tracking-widest rounded-xl hover:bg-slate-50 transition-all border border-slate-200 cursor-pointer"
                  >
                    Abort
                  </button>
                </div>
              </form>
           </div>
        </div>
      )}

      {/* active protocols list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center bg-white border border-slate-200 rounded-3xl">
             <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Synchronizing Consensus Stream...</p>
          </div>
        ) : polls.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white border border-slate-200 rounded-3xl text-slate-400">No consensus protocols initialized.</div>
        ) : (
          polls.map((poll) => (
            <div key={poll.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col group hover:border-primary/40 transition-all duration-500 shadow-sm">
               <div className="p-6 border-b border-slate-100 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-all ${
                      poll.active ? "bg-green-600 text-white border-green-600 shadow-sm" : "bg-red-600 text-white border-red-600 shadow-sm"
                    }`}>
                      {poll.active ? "Protocol Active" : "Terminated"}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-tighter">
                      <Users className="h-3 w-3" />
                      {poll.totalVotes} Samples Collected
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors">{poll.question}</h3>
               </div>
               
               <div className="p-6 flex-1 space-y-4 bg-slate-50">
                  {poll.options.map((opt) => {
                    const percentage = poll.totalVotes > 0 ? (opt.votes / poll.totalVotes) * 100 : 0;
                    return (
                      <div key={opt.id} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          <span>{opt.text}</span>
                          <span className="text-slate-900">{Math.round(percentage)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                           <div 
                             className="h-full bg-primary transition-all duration-1000 ease-out" 
                             style={{ width: `${percentage}%` }}
                           ></div>
                        </div>
                      </div>
                    );
                  })}
               </div>

               <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <button 
                       onClick={() => handleToggleActive(poll.id, poll.active)}
                       className={`p-2 rounded-lg transition-all cursor-pointer ${
                         poll.active ? "text-red-400 hover:text-red-500 hover:bg-red-500/10" : "text-green-400 hover:text-green-500 hover:bg-green-500/10"
                       }`}
                       title={poll.active ? "Terminate Protocol" : "Reactivate Protocol"}
                     >
                       {poll.active ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                     </button>
                     <button 
                        onClick={() => handleDeletePoll(poll.id)}
                        className="p-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-all shadow-sm cursor-pointer"
                        title="Purge Intel"
                     >
                        <Trash2 className="h-4 w-4" />
                     </button>
                  </div>
                  <div className="flex items-center gap-4">
                     <button className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer">
                       Full Analytics <BarChart3 className="h-3 w-3" />
                     </button>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
