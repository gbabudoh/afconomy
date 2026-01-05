"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Newspaper, 
  Globe, 
  Image as ImageIcon, 
  Type, 
  AlignLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Save,
  X,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Filter,
  Eye,
  MessageSquare
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  category: string | null;
  imageUrl: string | null;
  url: string | null;
  publishedAt: string;
  countryId: string | null;
  country?: { name: string; code: string };
}

export default function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<NewsItem> | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Macro");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/news?page=${page}&limit=10`);
      const data = await res.json();
      if (res.ok) {
        setNews(data.news);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setContent(item.content);
    setSummary(item.summary || "");
    setCategory(item.category || "Macro");
    setImageUrl(item.imageUrl || "");
    setLinkUrl(item.url || "");
    setIsEditorOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditingItem(null);
    setTitle("");
    setContent("");
    setSummary("");
    setCategory("Macro");
    setImageUrl("");
    setLinkUrl("");
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      content,
      summary,
      category,
      imageUrl,
      url: linkUrl,
    };

    try {
      const url = `/api/admin/news`;
      const method = editingItem ? "PATCH" : "POST";
      const finalPayload = editingItem ? { ...payload, id: editingItem.id } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (res.ok) {
        if (!editingItem) {
          setTitle("");
          setContent("");
          setSummary("");
          setImageUrl("");
          setLinkUrl("");
        } else {
          setEditingItem(null);
        }
        fetchNews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm news deletion? This will remove the article from all platform feeds.")) return;
    try {
      const res = await fetch("/api/admin/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchNews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { label: "Articles Broadcasted", value: totalPages * 10 || 0, trend: "+4 this week", icon: Newspaper, color: "text-blue-600", bg: "bg-blue-600/10" },
    { label: "Signal Velocity", value: "94%", trend: "Optimal", icon: Zap, color: "text-amber-600", bg: "bg-amber-600/10" },
    { label: "Audience Reach", value: "2.8k", trend: "+12%", icon: Eye, color: "text-emerald-600", bg: "bg-emerald-600/10" },
    { label: "Signal Clusters", value: "5", trend: "Verified", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-600/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editorial <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-black opacity-60 flex items-center gap-2">
            <TrendingUp className="h-3 w-3" />
            Intelligence Feed & Bulletin Management
          </p>
        </div>
        <button 
          onClick={handleNew}
          className="px-6 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.25)] active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Broadcast New Intel
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
                  Global
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

      {/* [ Top - Full Width ] Broadcast Protocol Editor */}
      <div className={`w-full transition-all duration-500 ${isEditorOpen ? 'opacity-100 translate-y-0' : 'hidden'}`}>
        <div className="bg-[#DCDCDC] border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative border-t-8 border-t-primary w-full">
            <div className="p-8 border-b border-slate-200/50 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-900">
                      <Newspaper className="h-4 w-4 text-primary" />
                      Broadcast Protocol
                  </h2>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Intelligence Feed Dispatch</p>
                </div>
                <div className="flex items-center gap-3">
                  {editingItem && (
                     <button onClick={() => { setEditingItem(null); setIsEditorOpen(false); }} className="p-3 bg-white/50 border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 transition-all shadow-sm flex items-center gap-2 text-[10px] font-black uppercase cursor-pointer">
                        <X className="h-4 w-4" />
                        Discard Draft
                     </button>
                  )}
                  <button onClick={() => setIsEditorOpen(false)} className="p-3 bg-white/50 border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 transition-all shadow-sm cursor-pointer">
                      <X className="h-5 w-5" />
                  </button>
                </div>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Headline Intelligence</label>
                        <div className="relative group">
                          <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold"
                            placeholder="Enter the primary headline..."
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Intel Sector</label>
                          <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm outline-none focus:border-primary/40 text-white font-bold cursor-pointer"
                          >
                            <option>Macro</option>
                            <option>Market</option>
                            <option>Energy</option>
                            <option>Technology</option>
                            <option>Logistics</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Signal Quality</label>
                          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-sm text-emerald-600 font-black flex items-center justify-between">
                             Verified
                             <ShieldCheck className="h-4 w-4" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Tactical Summary</label>
                        <div className="relative group">
                          <AlignLeft className="absolute left-4 top-4 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <textarea 
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-xs h-32 resize-none focus:outline-none focus:border-primary/40 transition-all font-medium leading-relaxed text-slate-900"
                            placeholder="Brief overview for regional analytics..."
                          />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Full Intelligence Brief</label>
                        <textarea 
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-2xl p-6 text-xs h-[17.5rem] resize-none focus:outline-none focus:border-primary/40 transition-all font-mono leading-relaxed text-slate-900"
                          placeholder="Complete analytical breakdown (markdown supported)..."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Asset URI</label>
                          <div className="relative group">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input 
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-medium"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Source Link</label>
                          <div className="relative group">
                            <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input 
                              value={linkUrl}
                              onChange={(e) => setLinkUrl(e.target.value)}
                              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-medium"
                              placeholder="Original URL..."
                            />
                          </div>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-200/50 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="bg-white/50 border border-slate-200 p-4 rounded-3xl flex items-center gap-4 max-w-2xl">
                        <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                          <Zap className="h-4 w-4 text-amber-600" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed text-center lg:text-left">
                          <span className="text-slate-900 uppercase font-black mr-2">Signal Protocol:</span>
                          Broadcasts are instantaneously distributed across the global analytical mesh and notification clusters.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                       <button 
                          type="button" 
                          onClick={() => setIsEditorOpen(false)}
                          className="flex-1 lg:w-32 py-5 bg-white border border-slate-200 text-slate-500 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
                       >
                         Discard
                       </button>
                       <button 
                          type="submit" 
                          className="flex-[2] lg:w-64 py-5 bg-primary text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(234,179,8,0.3)] active:scale-95 cursor-pointer"
                       >
                          <Save className="h-4 w-4" />
                          {editingItem ? "Update Intelligence" : "Broadcast to Feed"}
                       </button>
                    </div>
                </div>
            </form>
        </div>
      </div>

      {/* [ Bottom ] News Feed Registry */}
      <div className="w-full space-y-6">
         <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm w-full">
            {/* Search and Filters */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search intelligence logs..." 
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400"
                  />
               </div>
               <div className="flex items-center gap-3">
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">
                     <Filter className="h-4 w-4" />
                  </button>
                  <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Intel Clusters: <span className="text-slate-900">Live Feed</span>
                  </span>
               </div>
            </div>

            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="py-24 text-center">
                   <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Signal Archives...</p>
                </div>
              ) : news.length === 0 ? (
                <div className="py-24 text-center">
                   <Newspaper className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                   <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No news signal found in the current sector.</p>
                </div>
              ) : (
                news.map((item) => (
                  <div key={item.id} className="p-8 hover:bg-slate-50/50 transition-all group flex flex-col lg:flex-row gap-8">
                      {item.imageUrl && (
                        <div className="w-full lg:w-48 h-32 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105">
                          <img src={item.imageUrl} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-700" />
                        </div>
                      )}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-md">
                            {item.category || "General"}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {item.country && (
                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
                              <Globe className="h-3 w-3" />
                              {item.country.name}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">{item.summary || item.content.substring(0, 150) + "..."}</p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="flex items-center gap-6">
                              <button 
                                onClick={() => handleEdit(item)}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary flex items-center gap-2 transition-all cursor-pointer"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                                Decrypt Intel
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id)}
                                className="px-3 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Purge
                              </button>
                           </div>
                           {item.url && (
                             <a href={item.url} target="_blank" className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60 hover:text-blue-600 flex items-center gap-2 transition-all cursor-pointer">
                                Source Node <ExternalLink className="h-3.5 w-3.5" />
                             </a>
                           )}
                        </div>
                      </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signal Stream: Online</span>
              </div>
              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-3 rounded-xl disabled:opacity-20 hover:bg-slate-50 transition-all text-slate-500"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-1 min-w-[80px] justify-center">
                   <span className="text-[10px] font-black text-slate-900">SECTOR {page}</span>
                   <span className="text-[10px] font-bold text-slate-400">/ {totalPages}</span>
                </div>
                <button 
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="p-3 rounded-xl disabled:opacity-20 hover:bg-slate-50 transition-all text-slate-500"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
