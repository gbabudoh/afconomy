"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  FileText, 
  BookOpen, 
  Save,
  X,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Layout,
  Type,
  AlignLeft,
  LucideIcon,
  Activity as ActivityIcon,
  Leaf,
  Building2
} from "lucide-react";

interface ResearchItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  fullContent: string;
  icon: string;
  publishedAt: string;
  createdAt: string;
}

const iconMap: Record<string, LucideIcon> = {
  Activity: ActivityIcon,
  Leaf: Leaf,
  Building2: Building2,
  TrendingUp: TrendingUp,
  FileText: FileText,
};

export default function ResearchManagement() {
  const [research, setResearch] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ResearchItem> | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [summary, setSummary] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [icon, setIcon] = useState("Activity");

  const fetchResearch = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/research");
      const data = await res.json();
      if (res.ok) {
        setResearch(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearch();
  }, []);

  const handleEdit = (item: ResearchItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setSummary(item.summary);
    setFullContent(item.fullContent);
    setIcon(item.icon);
    setIsEditorOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("Technology");
    setSummary("");
    setFullContent("");
    setIcon("Activity");
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      category,
      summary,
      fullContent,
      icon,
    };

    try {
      const url = "/api/admin/research";
      const method = editingItem ? "PATCH" : "POST";
      const finalPayload = editingItem ? { ...payload, id: editingItem.id } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (res.ok) {
        setIsEditorOpen(false);
        fetchResearch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm research deletion?")) return;
    try {
      const res = await fetch("/api/admin/research", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchResearch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Research <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-black opacity-60 flex items-center gap-2">
            <TrendingUp className="h-3 w-3" />
            Manage Featured Research & Deep Dives
          </p>
        </div>
        <button 
          onClick={handleNew}
          className="px-6 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.25)] active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Publish New Research
        </button>
      </div>

      {isEditorOpen && (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative border-t-8 border-t-primary w-full animate-in slide-in-from-top-4 duration-500">
          <div className="p-8 border-b border-slate-200/50 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-900">
              <BookOpen className="h-4 w-4 text-primary" />
              {editingItem ? "Update Intelligence" : "Draft Research"}
            </h2>
            <button onClick={() => setIsEditorOpen(false)} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 transition-all shadow-sm cursor-pointer">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Research Title</label>
                  <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary transition-all text-slate-900 font-bold"
                    placeholder="Enter research title..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-900 cursor-pointer"
                    >
                      <option>Technology</option>
                      <option>Agriculture</option>
                      <option>Infrastructure</option>
                      <option>Macroeconomics</option>
                      <option>Energy</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Icon Representation</label>
                    <select 
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-900 cursor-pointer"
                    >
                      <option value="Activity">Pulse (Activity)</option>
                      <option value="Leaf">Nature (Leaf)</option>
                      <option value="Building2">Structural (Building)</option>
                      <option value="TrendingUp">Market (Trending)</option>
                      <option value="FileText">Document (File)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Executive Summary</label>
                  <textarea 
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs h-32 resize-none focus:outline-none focus:border-primary transition-all font-medium text-slate-900"
                    placeholder="Brief overview..."
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Full Research Content (Markdown)</label>
                <textarea 
                  value={fullContent}
                  onChange={(e) => setFullContent(e.target.value)}
                  className="w-full px-6 py-6 bg-slate-50 border border-slate-200 rounded-2xl text-xs h-[23.5rem] resize-none focus:outline-none focus:border-primary transition-all font-mono leading-relaxed text-slate-900"
                  placeholder="# Enter full research content here..."
                  required
                />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center justify-end gap-4">
              <button 
                type="button" 
                onClick={() => setIsEditorOpen(false)}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-500 font-black uppercase text-xs rounded-2xl hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-12 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Save className="h-4 w-4" />
                {editingItem ? "Update Intelligence" : "Broadcast Research"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Intelligence Registry</h3>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            Live Database
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="py-24 text-center">
              <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Intelligence Mesh...</p>
            </div>
          ) : research.length === 0 ? (
            <div className="py-24 text-center">
              <BookOpen className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No research signals currently indexed.</p>
            </div>
          ) : (
            research.map((item) => {
              const Icon = iconMap[item.icon] || FileText;
              return (
                <div key={item.id} className="p-8 hover:bg-slate-50/50 transition-all group">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex gap-6">
                      <div className="p-4 bg-slate-900 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-md">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(item.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-sm text-slate-500 line-clamp-2 max-w-3xl leading-relaxed">{item.summary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary/30 transition-all cursor-pointer shadow-sm"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-500/30 transition-all cursor-pointer shadow-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
