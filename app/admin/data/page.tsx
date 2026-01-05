"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  Trash2, 
  Search, 
  Filter, 
  Calendar,
  Layers,
  Activity,
  Zap,
  Save,
  X,
  Gauge,
  Database,
  Globe,
  Monitor,
  ShieldCheck,
  Clock
} from "lucide-react";

interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: string;
  countryId: string;
  country: { name: string; code: string };
}

interface Country {
  id: string;
  name: string;
  code: string;
}

export default function DataTerminal() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSector, setActiveSector] = useState("All Sectors");
  
  // Form states
  const [name, setName] = useState("Inflation Rate");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("%");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [countryId, setCountryId] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [metricsRes, countriesRes] = await Promise.all([
        fetch("/api/admin/metrics"),
        fetch("/api/admin/countries")
      ]);
      
      const metricsData = await metricsRes.json();
      const countriesData = await countriesRes.json();
      
      if (metricsRes.ok) setMetrics(metricsData);
      if (countriesRes.ok) {
        setCountries(countriesData);
        if (countriesData.length > 0) setCountryId(countriesData[0].id);
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
    if (!countryId) return;

    try {
      const res = await fetch("/api/admin/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, value, unit, date, countryId }),
      });

      if (res.ok) {
        setValue("");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Purge this data point from the analytics engine?")) return;
    try {
      const res = await fetch("/api/admin/metrics", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMetrics = metrics.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = activeSector === "All Sectors" || m.name.includes(activeSector);
    return matchesSearch && matchesSector;
  });

  const stats = [
    { label: "Metrics Logged", value: metrics.length, trend: "+12.5%", icon: Database, color: "text-blue-600", bg: "bg-blue-600/10" },
    { label: "Update Velocity", value: "Real-time", trend: "Optimal", icon: Zap, color: "text-amber-600", bg: "bg-amber-600/10" },
    { label: "Data Integrity", value: "99.9%", trend: "Verified", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-600/10" },
    { label: "Active Nodes", value: countries.length, trend: "Synced", icon: Globe, color: "text-purple-600", bg: "bg-purple-600/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Data <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-black opacity-60 flex items-center gap-2">
            <Gauge className="h-3 w-3" />
            Economic Metrics & Strategic Indicators Core
          </p>
        </div>
        <button 
          onClick={() => setIsEditorOpen(!isEditorOpen)}
          className="px-6 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.25)] active:scale-95 cursor-pointer"
        >
          <Zap className="h-4 w-4" />
          {isEditorOpen ? "Cancel Injection" : "Inject Data Point"}
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

      {/* [ Top - Full Width ] Data Injector Protocol */}
      <div className={`w-full transition-all duration-500 ${isEditorOpen ? 'opacity-100 translate-y-0' : 'hidden'}`}>
        <div className="bg-[#DCDCDC] border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative border-t-8 border-t-primary w-full">
            <div className="p-8 border-b border-slate-200/50 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-900">
                      <Zap className="h-4 w-4 text-primary" />
                      Data Injector Protocol
                  </h2>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Sovereign Indicator Management</p>
                </div>
                <button onClick={() => setIsEditorOpen(false)} className="p-3 bg-white/50 border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 transition-all shadow-sm cursor-pointer">
                    <X className="h-5 w-5" />
                </button>
            </div>

            <form onSubmit={handleSave} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Indicator Identity</label>
                        <select 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold cursor-pointer"
                        >
                          <option>Inflation Rate</option>
                          <option>GDP Growth (%)</option>
                          <option>Poverty Index</option>
                          <option>Interest Rate</option>
                          <option>Unemployment</option>
                          <option>Reserve Ratio</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Sovereign Target</label>
                        <select 
                          value={countryId}
                          onChange={(e) => setCountryId(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-bold cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Magnitude</label>
                            <input 
                              type="number"
                              step="0.01"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-black"
                              placeholder="0.00"
                              required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Unit</label>
                            <input 
                              value={unit}
                              onChange={(e) => setUnit(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-bold text-center"
                              placeholder="%"
                              required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Verification Date</label>
                        <input 
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-bold"
                          required
                        />
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200/50 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="bg-white/50 border border-slate-200 p-4 rounded-3xl flex items-center gap-4 max-w-2xl">
                        <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                          <span className="text-slate-900 uppercase font-black mr-2">Sync Protocol:</span>
                          Data synchronization is immediate across all African analytical nodes once committed to the central core.
                        </p>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full lg:w-64 py-5 bg-primary text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(234,179,8,0.3)] active:scale-95 cursor-pointer"
                    >
                        <Save className="h-4 w-4" />
                        Commit Data Point
                    </button>
                </div>
            </form>
        </div>
      </div>

      {/* [ Bottom ] Metrics Registry / Table */}
      <div className="w-full space-y-6">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm w-full">
            {/* Search and Filters */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search metrics or regions..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400"
                  />
               </div>
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <select 
                      value={activeSector}
                      onChange={(e) => setActiveSector(e.target.value)}
                      className="bg-transparent border-none text-[10px] font-black text-slate-600 uppercase tracking-widest focus:outline-none cursor-pointer"
                    >
                      <option>All Sectors</option>
                      <option>Inflation</option>
                      <option>GDP</option>
                      <option>Interest</option>
                    </select>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Data Logs: <span className="text-slate-900">{filteredMetrics.length}</span>
                  </span>
               </div>
            </div>

            {/* Metrics Table */}
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Metric Identity</th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Regional Node</th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Measured Value</th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Audit Timestamp</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-24 text-center">
                           <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Accessing Core Logs...</p>
                        </td>
                      </tr>
                    ) : filteredMetrics.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-24 text-center">
                          <Layers className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                          <p className="text-slate-500 font-bold">No strategic indicators found matching your criteria.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredMetrics.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                   <Activity className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                   <span className="font-bold text-sm tracking-tight text-slate-900">{item.name}</span>
                                   <span className="text-[10px] font-medium text-slate-400 uppercase">Economic Indicator</span>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-6">
                             <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                   {item.country.name}
                                </span>
                             </div>
                          </td>
                          <td className="px-6 py-6">
                             <div className="flex items-baseline gap-1">
                                <span className="text-base font-black text-primary">{item.value.toLocaleString()}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.unit}</span>
                             </div>
                          </td>
                          <td className="px-6 py-6">
                             <div className="flex items-center gap-2 text-slate-400">
                                <Calendar className="h-4 w-4" />
                                <span className="text-[11px] font-bold tracking-tight text-slate-500 uppercase">
                                   {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button 
                               onClick={() => handleDelete(item.id)}
                               className="p-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-all shadow-sm cursor-pointer"
                               title="Purge Signal"
                             >
                                <Trash2 className="h-4 w-4" />
                             </button>
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
