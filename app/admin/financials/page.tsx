"use client";

import { useState, useEffect } from "react";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Activity, 
  Plus, 
  Edit3, 
  Trash2, 
  RefreshCw,
  Search,
  Globe,
  Save,
  X,
  PieChart,
  ArrowUpRight,
  Monitor,
  ShieldCheck,
  Filter,
  Clock
} from "lucide-react";

interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  countryCode: string;
  rateToUSD: number;
  lastUpdated: string;
}

export default function FinancialAssets() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(true); // Default to open for visibility
  const [editingItem, setEditingItem] = useState<Currency | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form states
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [rate, setRate] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/financials");
      const data = await res.json();
      if (res.ok) {
        setCurrencies(data.currencies);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PATCH" : "POST";
      const payload = editingItem ? { id: editingItem.id, rateToUSD: rate } : { code, name, symbol, countryCode, rateToUSD: rate };
      
      const res = await fetch("/api/admin/financials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Reset form but keep editor open for the next one
        if (!editingItem) {
          setCode("");
          setName("");
          setSymbol("");
          setCountryCode("");
          setRate("");
        } else {
          setEditingItem(null);
          setRate("");
        }
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Liquidate this financial asset?")) return;
    try {
      const res = await fetch("/api/admin/financials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditor = (item?: Currency) => {
    if (item) {
      setEditingItem(item);
      setRate(item.rateToUSD.toString());
      // Scroll to top to see editor? 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setEditingItem(null);
      setCode("");
      setName("");
      setSymbol("");
      setCountryCode("");
      setRate("");
    }
    setIsEditorOpen(true);
  };

  const filteredCurrencies = currencies.filter(curr => 
    curr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curr.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Assets Tracked", value: currencies.length, trend: "Stable", icon: Globe, color: "text-blue-600", bg: "bg-blue-600/10" },
    { label: "Sync Latency", value: "14ms", trend: "-2ms", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-600/10" },
    { label: "Pricing Nodes", value: "12", trend: "Active", icon: Monitor, color: "text-primary", bg: "bg-primary/10" },
    { label: "Audit Status", value: "Secure", trend: "Verified", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-600/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Financial <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-black opacity-60 flex items-center gap-2">
            <TrendingUp className="h-3 w-3" />
            Sovereign Currencies & Exchange Control
          </p>
        </div>
        <button 
          onClick={() => openEditor()}
          className="px-6 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.25)] active:scale-95"
        >
          <Plus className="h-4 w-4" />
          List New Currency
        </button>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
               <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-5 w-5" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                  Live
               </span>
            </div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{stat.value}</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* [ Top - Full Width ] Asset Protocol Editor */}
      <div className={`w-full transition-all duration-500 ${isEditorOpen ? 'opacity-100' : 'hidden'}`}>
        <div className="bg-[#DCDCDC] border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative border-t-8 border-t-primary w-full">
            <div className="p-8 border-b border-slate-200/50 flex items-center justify-between">
                <div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-900">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Asset Protocol
                </h2>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Registry Management</p>
                </div>
                {editingItem && (
                    <button onClick={() => { setEditingItem(null); setRate(""); }} className="p-3 bg-white/50 border border-slate-200 rounded-2xl text-slate-500 hover:text-primary transition-all shadow-sm flex items-center gap-2 text-[10px] font-black uppercase">
                        <X className="h-4 w-4" />
                        Cancel Edit
                    </button>
                )}
            </div>

            <form onSubmit={handleSave} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                    {!editingItem ? (
                        <>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Currency Identity</label>
                                <input 
                                    value={name} 
                                    onChange={(e)=>setName(e.target.value)} 
                                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold" 
                                    placeholder="e.g. South African Rand" 
                                    required 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">ISO Code</label>
                                    <input 
                                        value={code} 
                                        onChange={(e)=>setCode(e.target.value.toUpperCase())} 
                                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-black tracking-widest" 
                                        placeholder="ZAR" 
                                        maxLength={3}
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Symbol</label>
                                    <input 
                                        value={symbol} 
                                        onChange={(e)=>setSymbol(e.target.value)} 
                                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-bold text-center" 
                                        placeholder="R" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Country ISO Alpha-3</label>
                                <input 
                                    value={countryCode} 
                                    onChange={(e)=>setCountryCode(e.target.value.toUpperCase())} 
                                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900" 
                                    placeholder="ZAF" 
                                    maxLength={3}
                                    required 
                                />
                            </div>
                        </>
                    ) : (
                        <div className="lg:col-span-2 p-4 bg-white/40 border border-slate-200 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary font-black text-xl">
                                    {editingItem.symbol}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">{editingItem.name}</p>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{editingItem.code} • {editingItem.countryCode}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-slate-100 rounded-xl">
                                <Clock className="h-3 w-3" />
                                Locked for Edit
                            </div>
                        </div>
                    )}
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Value Magnitude (vs 1 USD)</label>
                        <div className="relative group">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600" />
                            <input 
                                type="number"
                                step="0.0001"
                                value={rate} 
                                onChange={(e)=>setRate(e.target.value)} 
                                className="w-full bg-white border border-slate-200 rounded-2xl p-4 pl-12 text-lg font-black text-emerald-600 focus:outline-none focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-inner" 
                                placeholder="0.0000" 
                                required 
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <button 
                            type="submit" 
                            className="w-full py-5 bg-primary text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(234,179,8,0.3)] active:scale-95 disabled:opacity-50 h-full"
                        >
                            <Save className="h-4 w-4" />
                            {editingItem ? "Update Protocol" : "Authorize Asset"}
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/50">
                    <div className="bg-white/50 border border-slate-200 p-4 rounded-2xl flex items-center gap-4 max-w-2xl">
                        <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                            <Activity className="h-4 w-4 text-emerald-600" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                            <span className="text-slate-900 uppercase font-black mr-2">Pricing Pulse:</span>
                            Authorized changes are distributed immediately to all regional pricing nodes across the global intelligence network.
                        </p>
                    </div>
                </div>
            </form>
        </div>
      </div>

      {/* [ Bottom ] Asset List / Table */}
      <div className="w-full space-y-6">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm w-full">
            {/* Search and Filters */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search asset codes or names..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400"
                  />
               </div>
               <div className="flex items-center gap-3">
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-primary transition-colors">
                     <Filter className="h-4 w-4" />
                  </button>
                  <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Registry Nodes: <span className="text-slate-900">{filteredCurrencies.length}</span>
                  </span>
               </div>
            </div>

            {/* Assets Table */}
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50/80 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Identity</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Regional Cluster</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Exchange Rate</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">System Audit</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {loading ? (
                       <tr>
                          <td colSpan={5} className="py-24 text-center">
                             <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Synchronizing Market Data...</p>
                          </td>
                       </tr>
                     ) : filteredCurrencies.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="py-24 text-center">
                              <Globe className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                              <p className="text-slate-500 font-bold">No assets found matching your criteria.</p>
                           </td>
                        </tr>
                     ) : (
                       filteredCurrencies.map(curr => (
                         <tr key={curr.id} className="hover:bg-slate-50/50 transition-all group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
                                    {curr.symbol}
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="font-bold text-sm tracking-tight text-slate-900">{curr.name}</span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                       <span className="text-[10px] font-black uppercase tracking-widest text-primary px-1.5 py-0.5 bg-primary/10 rounded-md">{curr.code}</span>
                                       <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                                       <span className="text-[10px] font-medium text-slate-400 uppercase">Sovereign Asset</span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-6 font-mono text-xs font-bold text-slate-500 bg-slate-50/30">
                              <div className="flex items-center gap-2">
                                 <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                 {curr.countryCode}
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex flex-col">
                                 <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-black text-emerald-600">{curr.rateToUSD.toLocaleString()}</span>
                                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">/ USD</span>
                                 </div>
                                 <div className="flex items-center gap-1 mt-1">
                                    <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                                       <div className="h-full bg-emerald-500/30 w-1/3"></div>
                                    </div>
                                    <span className="text-[8px] font-bold text-emerald-600 uppercase">Stable</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                 <Clock className="h-3 w-3" />
                                 {new Date(curr.lastUpdated).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
                                 <button 
                                   onClick={() => openEditor(curr)} 
                                   className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:border-primary/40 hover:text-primary transition-all text-slate-400 shadow-sm"
                                 >
                                    <Edit3 className="h-4 w-4" />
                                 </button>
                                  <button 
                                    onClick={() => handleDelete(curr.id)} 
                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm"
                                    title="Purge Record"
                                  >
                                     <Trash2 className="h-4 w-4" />
                                  </button>
                              </div>
                           </td>
                         </tr>
                       ))
                     )}
                  </tbody>
               </table>
            </div>
          </div>
      </div>
    </div>
  );
}
