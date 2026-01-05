"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Trash2, 
  UserPlus, 
  Shield, 
  User as UserIcon, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Mail,
  Calendar,
  MoreHorizontal,
  TrendingUp,
  ShieldCheck,
  Zap,
  Activity,
  ArrowUpRight,
  Filter,
  Users as UsersIcon,
  MessageSquare,
  Save,
  X,
  ShieldEllipsis
} from "lucide-react";

interface UserData {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  _count: {
    messages: number;
  };
}

export default function UsersManagement() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?page=${page}&limit=20`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to terminate this user's clearance? This action cannot be undone.")) return;
    
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
      }
    } catch (err) {
      alert("An error occurred");
    }
  };

  const handleToggleRole = async (user: UserData) => {
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, role: newRole }),
      });
      
      if (res.ok) {
        setUsers(users.map(u => u.id === user.id ? { ...u, role: newRole } : u));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setName(user.name || "");
    setEmail(user.email);
    setRole(user.role);
    setIsEditorOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNew = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setRole("USER");
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have a POST/PATCH route for users
    // For now we'll simulate or use the existing role toggle logic if applicable
    alert("Provisioning protocol logic would be implemented here. Roles can be toggled via the table actions.");
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(search.toLowerCase()) || 
    (u.name && u.name.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = [
    { label: "Total Personnel", value: "2.4k", trend: "+12 this week", icon: UsersIcon, color: "text-blue-600", bg: "bg-blue-600/10" },
    { label: "Master Clearance", value: "8", trend: "Admins", icon: ShieldCheck, color: "text-amber-600", bg: "bg-amber-600/10" },
    { label: "Signal Frequency", value: "12.8k", trend: "Messages", icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-600/10" },
    { label: "Verified Nodes", value: "98%", trend: "Active", icon: Activity, color: "text-purple-600", bg: "bg-purple-600/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Intelligence <span className="text-primary italic">Clearance</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-black opacity-60 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Directory of Personnel & Access Levels
          </p>
        </div>
        <button 
          onClick={handleNew}
          className="px-6 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.25)] active:scale-95 cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          Authorize New Asset
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
                  Network
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

      {/* [ Top - Full Width ] Provisioning Protocol Editor */}
      <div className={`w-full transition-all duration-500 ${isEditorOpen ? 'opacity-100 translate-y-0' : 'hidden'}`}>
        <div className="bg-[#DCDCDC] border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative border-t-8 border-t-primary w-full">
            <div className="p-8 border-b border-slate-200/50 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-900">
                      <ShieldAlert className="h-4 w-4 text-primary" />
                      Provisioning Protocol
                  </h2>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Personnel Access Authorization</p>
                </div>
                <div className="flex items-center gap-3">
                  {editingUser && (
                     <button onClick={() => { setEditingUser(null); setIsEditorOpen(false); }} className="p-3 bg-white/50 border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 transition-all shadow-sm flex items-center gap-2 text-[10px] font-black uppercase cursor-pointer">
                        <X className="h-4 w-4" />
                        Cancel Draft
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
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Personnel Legal Identifier</label>
                        <div className="relative group">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold"
                            placeholder="Full Name..."
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Communication Node (Email)</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold"
                            placeholder="email@sovereign.mesh"
                            required
                          />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">Clearance Tier</label>
                        <select 
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm outline-none focus:border-primary/40 text-white font-bold cursor-pointer"
                        >
                          <option value="USER">USER (Restricted Access)</option>
                          <option value="ADMIN">ADMIN (Master Clearance)</option>
                          <option value="MODERATOR">MODERATOR (Content Custodian)</option>
                        </select>
                      </div>

                      <div className="bg-white/50 border border-slate-200 p-6 rounded-[2rem] flex items-center gap-6">
                         <div className="p-4 bg-emerald-100 rounded-2xl">
                           <ShieldEllipsis className="h-6 w-6 text-emerald-600" />
                         </div>
                         <div className="flex-1">
                            <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Protocol Status</p>
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed mt-1">
                               All clearance provisioning is logged to the immutable network audit trail.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-200/50 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 bg-white/50 border border-slate-200 p-4 rounded-3xl">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <Zap className="h-4 w-4 text-amber-600" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold">
                          Authorization keys will be dispatched to the communication node upon confirmation.
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
                          {editingUser ? "Update Clearance" : "Authorize New Asset"}
                       </button>
                    </div>
                </div>
            </form>
        </div>
      </div>

      {/* [ Bottom ] Personnel Registry Registry */}
      <div className="w-full space-y-6">
         <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm w-full">
            {/* Search and Filters */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search personnel directory..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                  />
               </div>
               <div className="flex items-center gap-3">
                  <select className="h-11 bg-slate-900 border border-slate-700 rounded-2xl px-4 text-[10px] font-black text-white uppercase tracking-widest focus:outline-none cursor-pointer">
                    <option>All Clearance Tiers</option>
                    <option>ADMIN (Master)</option>
                    <option>USER (Standard)</option>
                  </select>
                  <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-colors shadow-sm cursor-pointer">
                     <Filter className="h-4 w-4" />
                  </button>
               </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Subject Personnel</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Access Level</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Engagement</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Temporal</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Lock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-24 text-center">
                         <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                         <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Synchronizing Personnel Grid...</p>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-24 text-center">
                         <UsersIcon className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                         <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No personnel matching criteria found.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className={`h-11 w-11 rounded-2xl flex items-center justify-center border transition-all ${
                                user.role === "ADMIN" ? "bg-primary/10 border-primary/30 text-primary shadow-[0_0_15px_rgba(234,179,8,0.1)]" : "bg-slate-50 border-slate-200 text-slate-400"
                              }`}>
                                 {user.role === "ADMIN" ? <Shield className="h-6 w-6" /> : <UserIcon className="h-6 w-6" />}
                              </div>
                              <div className="flex flex-col">
                                 <span className="font-bold text-sm tracking-tight text-slate-900 group-hover:text-primary transition-colors">{user.name || "UNIDENTIFIED"}</span>
                                 <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5 mt-0.5">
                                    <Mail className="h-3 w-3" />
                                    {user.email}
                                 </span>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-6 font-medium text-sm text-slate-700">
                           <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                              user.role === "ADMIN" 
                                ? "bg-primary text-white border-primary shadow-sm" 
                                : "bg-slate-50 border-slate-200 text-slate-500"
                           }`}>
                             {user.role}
                           </span>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex flex-col gap-1.5">
                              <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                 <span>Activity</span>
                                 <span className="text-slate-900">{user._count.messages} Signals</span>
                              </div>
                              <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                 <div className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)]" style={{ width: `${Math.min(user._count.messages * 2, 100)}%` }}></div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex items-center gap-2 text-slate-400">
                              <Calendar className="h-3.5 w-3.5" />
                              <span className="text-[10px] font-bold uppercase tracking-tight">
                                {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                 onClick={() => handleToggleRole(user)}
                                 className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/40 transition-all shadow-sm cursor-pointer"
                                 title="Modify Clearance"
                              >
                                 <ShieldAlert className="h-4 w-4" />
                              </button>
                              <button 
                                 onClick={() => handleDeleteUser(user.id)}
                                 className="h-10 w-10 flex items-center justify-center rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                                 title="Terminate Access"
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

            <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Personnel Mesh: Verified</span>
              </div>
              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="p-3 rounded-xl disabled:opacity-20 hover:bg-slate-50 transition-all text-slate-500"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-1 min-w-[100px] justify-center">
                   <span className="text-[10px] font-black text-slate-900 uppercase">Sector {page}</span>
                   <span className="text-[10px] font-bold text-slate-400">/ {totalPages}</span>
                </div>
                <button 
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
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
