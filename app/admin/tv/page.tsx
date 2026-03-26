"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Tv, 
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
  MonitorPlay,
  PlayCircle,
  Clock,
  Link as LinkIcon,
  ToggleLeft as Toggle,
  ToggleRight,
  Upload,
  Loader2
} from "lucide-react";

interface StreamItem {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  type: "LIVE" | "PRE_RECORDED";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TVManagement() {
  const [streams, setStreams] = useState<StreamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StreamItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [type, setType] = useState<"LIVE" | "PRE_RECORDED">("LIVE");
  const [isActive, setIsActive] = useState(true);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const thumbInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const fetchStreams = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/tv`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response received:", text.slice(0, 100));
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (res.ok) {
        setStreams(data.streams);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  const handleEdit = (item: StreamItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description || "");
    setUrl(item.url);
    setThumbnailUrl(item.thumbnailUrl || "");
    setType(item.type);
    setIsActive(item.isActive);
    setIsEditorOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditingItem(null);
    setTitle("");
    setDescription("");
    setUrl("");
    setThumbnailUrl("");
    setType("LIVE");
    setIsActive(true);
    setIsEditorOpen(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'url' | 'thumbnailUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === 'thumbnailUrl') setUploadingThumbnail(true);
    else setUploadingVideo(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        if (field === 'thumbnailUrl') setThumbnailUrl(data.url);
        else setUrl(data.url);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console for details.");
    } finally {
      if (field === 'thumbnailUrl') setUploadingThumbnail(false);
      else setUploadingVideo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      url,
      thumbnailUrl,
      type,
      isActive,
    };

    try {
      const endpoint = `/api/admin/tv`;
      const method = editingItem ? "PATCH" : "POST";
      const finalPayload = editingItem ? { ...payload, id: editingItem.id } : payload;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      const contentType = res.headers.get("content-type");
      if (res.ok) {
        if (contentType && contentType.includes("application/json")) {
            await res.json();
        }
        setIsEditorOpen(false);
        fetchStreams();
      } else {
        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            alert("Error: " + (errorData.error || "Unknown error"));
        } else {
            const errorText = await res.text();
            console.error("Server error (HTML):", errorText.slice(0, 200));
            alert("Server returned an error page. Check console.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm stream decommissioning? This will remove the broadcast from all platform nodes.")) return;
    try {
      const res = await fetch("/api/admin/tv", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      
      const contentType = res.headers.get("content-type");
      if (res.ok) {
        fetchStreams();
      } else {
        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            alert("Error: " + (errorData.error || "Unknown error"));
        } else {
            console.error("Delete failed (HTML response)");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { label: "Active Nodes", value: streams.filter(s => s.isActive).length, trend: "Online", icon: Tv, color: "text-emerald-600", bg: "bg-emerald-600/10" },
    { label: "Signal Type", value: "Hybrid", trend: "Live/VOD", icon: Zap, color: "text-amber-600", bg: "bg-amber-600/10" },
    { label: "Bitrate Capacity", value: "8.5 Mbps", trend: "Optimal", icon: Activity, color: "text-blue-600", bg: "bg-blue-600/10" },
    { label: "Audit Status", value: "Secure", trend: "Verified", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-600/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Broadcast <span className="text-primary italic">Command</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-black opacity-60 flex items-center gap-2">
            <MonitorPlay className="h-3 w-3" />
            Afconomy TV & Multimedia Stream Management
          </p>
        </div>
        <button 
          onClick={handleNew}
          className="px-6 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.25)] active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Initialize New Stream
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
                  Network-1
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
                      <Tv className="h-4 w-4 text-primary" />
                      Broadcast Protocol
                  </h2>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Stream Configuration Matrix</p>
                </div>
                <button onClick={() => setIsEditorOpen(false)} className="p-3 bg-white/50 border border-slate-200 rounded-2xl text-slate-500 hover:text-primary transition-all shadow-sm cursor-pointer">
                    <X className="h-5 w-5" />
                </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Stream Identity</label>
                        <div className="relative group">
                          <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold"
                            placeholder="e.g. Daily Market Intelligence - Lagos"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Signal Type</label>
                          <select 
                            value={type}
                            onChange={(e) => setType(e.target.value as any)}
                            className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:border-primary/40 text-slate-900 font-bold cursor-pointer transition-all"
                          >
                            <option value="LIVE">Live Satellite Stream</option>
                            <option value="PRE_RECORDED">Pre-recorded Intelligence</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Operational State</label>
                          <button 
                            type="button"
                            onClick={() => setIsActive(!isActive)}
                            className={`w-full border rounded-2xl p-4 text-sm font-black flex items-center justify-between transition-all cursor-pointer ${
                              isActive ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400'
                            }`}
                          >
                             {isActive ? 'ACTIVE SIGNAL' : 'INACTIVE / STANDBY'}
                             {isActive ? <ToggleRight className="h-5 w-5" /> : <Toggle className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Signal Description</label>
                        <div className="relative group">
                          <AlignLeft className="absolute left-4 top-4 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-xs h-32 resize-none focus:outline-none focus:border-primary/40 transition-all font-medium leading-relaxed text-slate-900"
                            placeholder="Describe the content of this broadast..."
                          />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Source Stream URI / URL</label>
                        <div className="relative group">
                          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full pl-12 pr-32 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-mono focus:outline-none focus:border-primary/40 transition-all text-slate-900"
                            placeholder="http://.../hls/stream.m3u8 or media.mp4"
                            required
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 border-l border-slate-100 pl-2">
                             <input 
                               type="file" 
                               ref={videoInputRef} 
                               className="hidden" 
                               onChange={(e) => handleUpload(e, 'url')}
                               accept="video/*"
                             />
                             <button
                                type="button"
                                onClick={() => videoInputRef.current?.click()}
                                disabled={uploadingVideo}
                                className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                             >
                               {uploadingVideo ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                               Upload
                             </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Terminal Cover (Thumbnail) URL</label>
                        <div className="relative group">
                          <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            value={thumbnailUrl}
                            onChange={(e) => setThumbnailUrl(e.target.value)}
                            className="w-full pl-12 pr-32 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] focus:outline-none focus:border-primary/40 transition-all text-slate-900 font-medium"
                            placeholder="https://..."
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 border-l border-slate-100 pl-2">
                             <input 
                               type="file" 
                               ref={thumbInputRef} 
                               className="hidden" 
                               onChange={(e) => handleUpload(e, 'thumbnailUrl')}
                               accept="image/*"
                             />
                             <button
                                type="button"
                                onClick={() => thumbInputRef.current?.click()}
                                disabled={uploadingThumbnail}
                                className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                             >
                               {uploadingThumbnail ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                               Cover
                             </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/40 border border-slate-200 p-6 rounded-3xl space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Signal Preview</h4>
                        <div className="aspect-video w-full bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center relative">
                           <Tv className="h-12 w-12 text-primary opacity-20" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-200/50 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="bg-white/50 border border-slate-200 p-4 rounded-3xl flex items-center gap-4 max-w-2xl">
                        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                          <ShieldCheck className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed text-center lg:text-left">
                          <span className="text-slate-900 uppercase font-black mr-2">Transmission Protocol:</span>
                          Broadcasting updates are synced across the global satellite mesh every 12 seconds.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                       <button 
                          type="button" 
                          onClick={() => setIsEditorOpen(false)}
                          className="flex-1 lg:w-32 py-5 bg-white border border-slate-200 text-slate-500 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-slate-50 hover:text-primary transition-all active:scale-95 cursor-pointer"
                       >
                         Abort
                       </button>
                       <button 
                          type="submit" 
                          className="flex-[2] lg:w-64 py-5 bg-primary text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(234,179,8,0.3)] active:scale-95 cursor-pointer"
                       >
                          <Save className="h-4 w-4" />
                          {editingItem ? "Update Protocol" : "Authorize Stream"}
                       </button>
                    </div>
                </div>
            </form>
        </div>
      </div>

      {/* [ Bottom ] Stream Registry */}
      <div className="w-full space-y-6">
         <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm w-full">
            {/* Search and Filters */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search signal identities..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400"
                  />
               </div>
               <div className="flex items-center gap-3">
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-primary transition-colors cursor-pointer">
                     <Filter className="h-4 w-4" />
                  </button>
                  <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Network Nodes: <span className="text-slate-900">{streams.length}</span>
                  </span>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50/80 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Signal Identity</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Classification</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Network State</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Last Sync</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {loading ? (
                       <tr>
                          <td colSpan={5} className="py-24 text-center">
                             <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Network Signals...</p>
                          </td>
                       </tr>
                     ) : streams.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="py-24 text-center">
                              <Tv className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No broadcast signals detected in the current sector.</p>
                           </td>
                        </tr>
                     ) : (
                       streams.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                         <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="h-12 w-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform relative">
                                    {item.thumbnailUrl ? (
                                       <img src={item.thumbnailUrl} className="h-full w-full object-cover" alt="" />
                                    ) : (
                                       <PlayCircle className="h-6 w-6 text-slate-400" />
                                    )}
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                       <PlayCircle className="h-6 w-6 text-white" />
                                    </div>
                                 </div>
                                 <div>
                                    <p className="font-bold text-sm text-slate-900 leading-tight">{item.title}</p>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Sovereign Stream</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-6 font-mono text-xs font-bold text-slate-500 uppercase">
                              <div className="flex items-center gap-2">
                                 {item.type === 'LIVE' ? (
                                    <span className="flex items-center gap-1.5 text-red-600">
                                       <Activity className="h-3 w-3" />
                                       Live Broadcast
                                    </span>
                                 ) : (
                                    <span className="flex items-center gap-1.5 text-blue-600">
                                       <Calendar className="h-3 w-3" />
                                       VOD Cache
                                    </span>
                                 )}
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg border shadow-sm ${
                                 item.isActive 
                                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                                    : 'bg-slate-100 border-slate-200 text-slate-400'
                              }`}>
                                 {item.isActive ? 'Active Node' : 'Standby'}
                              </span>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                 <Clock className="h-3 w-3" />
                                 {new Date(item.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
                                 <button 
                                   onClick={() => handleEdit(item)}
                                   className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:border-primary/40 hover:text-primary transition-all text-slate-400 shadow-sm cursor-pointer"
                                 >
                                    <Edit3 className="h-4 w-4" />
                                 </button>
                                 <button 
                                   onClick={() => handleDelete(item.id)}
                                   className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm cursor-pointer"
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

            <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Synchronization Active</span>
            </div>
         </div>
      </div>
    </div>
  );
}
