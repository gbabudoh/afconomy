"use client";

import { useState, useEffect } from "react";
import { 
  Globe, 
  MapPin, 
  Users, 
  DollarSign, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  CreditCard,
  Hash,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Filter,
  Layers,
  Flag,
  Map,
  PieChart
} from "lucide-react";

interface Country {
  id: string;
  name: string;
  code: string;
  region: string;
  flagUrl: string | null;
  capital: string | null;
  currency: string | null;
  population: string | null;
  gdp: number | null;
  _count: {
    news: number;
    metrics: number;
    marketData: number;
  };
}

export default function CountriesManagement() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Country> | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [region, setRegion] = useState("West Africa");
  const [capital, setCapital] = useState("");
  const [currency, setCurrency] = useState("");
  const [population, setPopulation] = useState("");
  const [gdp, setGdp] = useState("");
  const [flagUrl, setFlagUrl] = useState("");

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/countries");
      const data = await res.json();
      if (res.ok) setCountries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleEdit = (item: Country) => {
    setEditingItem(item);
    setName(item.name);
    setCode(item.code);
    setRegion(item.region);
    setCapital(item.capital || "");
    setCurrency(item.currency || "");
    setPopulation(item.population || "");
    setGdp(item.gdp?.toString() || "");
    setFlagUrl(item.flagUrl || "");
    setIsEditorOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditingItem(null);
    setName("");
    setCode("");
    setRegion("West Africa");
    setCapital("");
    setCurrency("");
    setPopulation("");
    setGdp("");
    setFlagUrl("");
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      code,
      region,
      capital,
      currency,
      population,
      gdp: gdp ? parseFloat(gdp) : null,
      flagUrl,
    };

    try {
      const url = "/api/admin/countries";
      const method = editingItem ? "PATCH" : "POST";
      const finalPayload = editingItem ? { ...payload, id: editingItem.id } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (res.ok) {
        if (!editingItem) {
          setName("");
          setCode("");
          setCapital("");
          setCurrency("");
          setPopulation("");
          setGdp("");
          setFlagUrl("");
        } else {
          setEditingItem(null);
        }
        fetchCountries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this country from the global database? This will affect all analytical modules.")) return;
    try {
      const res = await fetch("/api/admin/countries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchCountries();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const countriesByRegion = countries.reduce((acc, curr) => {
    acc[curr.region] = (acc[curr.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    { label: "Sovereign Entities", value: countries.length, trend: "+1 new", icon: Globe, color: "text-blue-600", bg: "bg-blue-600/10" },
    { label: "Active Regions", value: Object.keys(countriesByRegion).length, trend: "Stable", icon: Map, color: "text-amber-600", bg: "bg-amber-600/10" },
    { label: "Avg Population", value: countries.length ? (countries.reduce((acc, c) => acc + (c.population ? parseInt(c.population) : 0), 0) / countries.length / 1000000).toFixed(1) + "M" : "0", trend: "Balanced", icon: Users, color: "text-emerald-600", bg: "bg-emerald-600/10" },
    { label: "Total GDP Area", value: "$" + (countries.reduce((acc, c) => acc + (c.gdp || 0), 0) / 1000000000000).toFixed(2) + "T", trend: "Expanding", icon: DollarSign, color: "text-purple-600", bg: "bg-purple-600/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Geopolitical <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-black opacity-60 flex items-center gap-2">
            <TrendingUp className="h-3 w-3" />
            Regional Directory & Core Economic Indicators
          </p>
        </div>
        <button 
          onClick={handleNew}
          className="px-6 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.25)] active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Map New Region
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
                  Sector-1
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

      {/* [ Top - Full Width ] Sector Editor */}
      <div className={`w-full transition-all duration-500 ${isEditorOpen ? 'opacity-100 translate-y-0' : 'hidden'}`}>
        <div className="bg-[#DCDCDC] border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative border-t-8 border-t-primary w-full">
          <div className="p-8 border-b border-slate-200/50 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-900">
                  <Globe className="h-4 w-4 text-primary" />
                  Sovereign Entity Protocol
              </h2>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Geopolitical Asset Registry</p>
            </div>
            <div className="flex items-center gap-3">
              {editingItem && (
                 <button onClick={() => { setEditingItem(null); setIsEditorOpen(false); }} className="p-3 bg-white/50 border border-slate-200 rounded-2xl text-slate-500 hover:text-primary transition-all shadow-sm flex items-center gap-2 text-[10px] font-black uppercase">
                    <X className="h-4 w-4" />
                    Cancel Edit
                 </button>
              )}
              <button onClick={() => setIsEditorOpen(false)} className="p-3 bg-white/50 border border-slate-200 rounded-2xl text-slate-500 hover:text-primary transition-all shadow-sm">
                  <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSave} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Entity Name</label>
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold"
                  placeholder="e.g., Nigeria"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">ISO Code</label>
                <div className="relative group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-black tracking-widest"
                    placeholder="NGA"
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Regional Sector</label>
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:border-primary/40 text-slate-900 font-bold"
                >
                  <option>West Africa</option>
                  <option>East Africa</option>
                  <option>North Africa</option>
                  <option>Southern Africa</option>
                  <option>Central Africa</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Capital City</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-bold"
                    placeholder="Abuja"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Sovereign Currency</label>
                <div className="relative group">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-bold"
                    placeholder="NGN"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Population (Magnitude)</label>
                <div className="relative group">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="number"
                    value={population}
                    onChange={(e) => setPopulation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-black"
                    placeholder="218500000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Nominal GDP (USD)</label>
                <div className="relative group">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                  <input 
                    type="number"
                    value={gdp}
                    onChange={(e) => setGdp(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-black"
                    placeholder="477380000000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Flag Image URI</label>
                <div className="relative group">
                  <Flag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    value={flagUrl}
                    onChange={(e) => setFlagUrl(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-medium"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200/50 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="bg-white/50 border border-slate-200 p-4 rounded-3xl flex items-center gap-4 max-w-2xl">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                      <span className="text-slate-900 uppercase font-black mr-2">Audit Protocol:</span>
                      Updates to sovereign entities are logged in the global intelligence network and reflected across all analytical nodes.
                    </p>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                   <button 
                      type="button" 
                      onClick={() => setIsEditorOpen(false)}
                      className="flex-1 lg:w-32 py-5 bg-white border border-slate-200 text-slate-500 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
                   >
                     Discard
                   </button>
                   <button 
                      type="submit" 
                      className="flex-[2] lg:w-64 py-5 bg-primary text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(234,179,8,0.3)] active:scale-95"
                   >
                      <Save className="h-4 w-4" />
                      {editingItem ? "Update Entity" : "Update Database"}
                   </button>
                </div>
            </div>
          </form>
        </div>
      </div>

      {/* [ Bottom ] Countries Registry / Table */}
      <div className="w-full space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm w-full">
            {/* Search and Filters */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search sovereign entities..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400"
                  />
               </div>
               <div className="flex items-center gap-3">
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-primary transition-colors">
                     <Filter className="h-4 w-4" />
                  </button>
                  <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Sovereign Nodes: <span className="text-slate-900">{filteredCountries.length}</span>
                  </span>
               </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Entity & Registry</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Regional Cluster</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Demographics</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Economic Value</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-24 text-center">
                        <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Scanning Geopolitical Clusters...</p>
                      </td>
                    </tr>
                  ) : filteredCountries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-24 text-center">
                         <Layers className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                         <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No sovereign entities matched the protocol.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredCountries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="h-10 w-14 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                 {item.flagUrl ? (
                                   <img src={item.flagUrl} alt="" className="h-full w-full object-cover" />
                                 ) : (
                                   <div className="h-full w-full flex items-center justify-center text-slate-300">
                                      <Globe className="h-5 w-5" />
                                   </div>
                                 )}
                              </div>
                              <div>
                                <p className="font-bold text-sm tracking-tight text-slate-900">{item.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                   <span className="text-[10px] font-black uppercase tracking-widest text-primary px-1.5 py-0.5 bg-primary/10 rounded-md">{item.code}</span>
                                   <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                                   <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">Cluster Node</span>
                                </div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-6 font-bold text-[10px] text-slate-500 uppercase tracking-widest">
                           <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
                              {item.region}
                           </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                                 <Users className="h-3.5 w-3.5 text-blue-500/50" />
                                 {item.population ? (parseInt(item.population) / 1000000).toFixed(1) + "M" : "0"}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                 <MapPin className="h-3 w-3" />
                                 {item.capital || "N/A Cluster"}
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 w-fit">
                                 <DollarSign className="h-3.5 w-3.5" />
                                 {item.gdp ? (item.gdp / 1000000000).toFixed(1) + "B" : "0"}
                              </div>
                              <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase ml-1">
                                 <PieChart className="h-2.5 w-2.5" />
                                 Tactical Value
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEdit(item)}
                                className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:border-primary/40 hover:text-primary transition-all shadow-sm"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                               <button 
                                 onClick={() => handleDelete(item.id)}
                                 className="h-10 w-10 flex items-center justify-center rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm"
                                 title="Purge Core"
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
