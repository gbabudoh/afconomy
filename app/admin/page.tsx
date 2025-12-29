"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  Activity, 
  TrendingUp, 
  ArrowUpRight,
  ShieldCheck,
  Server,
  Database,
  Cpu,
  Clock
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-secondary animate-pulse">Initializing Terminal...</p>
      </div>
    );
  }

  const statCards = [
    { title: "Total Intelligence Assets (Users)", value: stats?.totalUsers || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-600/10", trend: `+${stats?.newUsers24h || 0} last 24h` },
    { title: "Network Transmission (Messages)", value: stats?.totalMessages || 0, icon: MessageSquare, color: "text-green-600", bg: "bg-green-600/10", trend: `+${stats?.messages24h || 0} last 24h` },
    { title: "Consensus Protocols (Polls)", value: stats?.totalPolls || 0, icon: BarChart3, color: "text-primary", bg: "bg-primary/10", trend: "Stable" },
    { title: "System Operational Uptime", value: stats?.uptime || "99.9%", icon: Activity, color: "text-purple-600", bg: "bg-purple-600/10", trend: "Optimal" },
  ];

  const systemMetrics = [
    { label: "Core Response Latency", value: stats?.dbLatency || "24ms", icon: Database, status: "Normal" },
    { label: "System Health Status", value: stats?.systemStatus || "Operational", icon: ShieldCheck, status: "Secure" },
    { label: "Server Load Distribution", value: "14.2%", icon: Cpu, status: "Low" },
    { label: "Regional Update Frequency", value: "Real-time", icon: Clock, status: "Active" },
  ];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Command <span className="text-primary underline decoration-primary/30 decoration-4 underline-offset-8">Dashboard</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-bold opacity-60">Intelligence Overview & Control</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-600 border border-green-600 rounded-xl shadow-sm">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
            <span className="text-xs font-bold text-white uppercase tracking-tighter">Production Node Active</span>
          </div>
          <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-white hover:bg-slate-800 transition-all flex items-center gap-2">
            <Server className="h-4 w-4 text-primary" />
            Clear System Cache
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-primary/50 transition-all group relative overflow-hidden shadow-sm">
            <div className={`absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500`}>
              <card.icon className="h-24 w-24" />
            </div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 ${card.bg} rounded-2xl`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-tighter bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                <TrendingUp className="h-3 w-3 text-primary" />
                Metrics
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{card.title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">{card.value}</span>
                <span className="text-xs font-bold text-primary flex items-center gap-0.5">
                   <ArrowUpRight className="h-3 w-3" />
                   Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 font-medium border-t border-slate-100 pt-3">
                {card.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {/* Top Section: Security Protocol (Prio 1) and Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Security Protocol */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm border-t-8 border-t-primary relative">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Security Protocol
              </h2>
              <div className="flex items-center gap-2">
                 <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                 <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">System Shield Active</span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2 p-5 rounded-3xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Master Access Key</span>
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl">
                      <code className="text-xs font-mono text-primary font-bold">AFCO_SEC_TRX_9281729182</code>
                      <ShieldCheck className="h-4 w-4 text-primary opacity-40" />
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                    Generate New Session Keys
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-2">
                    <Activity className="h-3 w-3" />
                    Recent Security Handshakes
                  </h3>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-sm transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-green-500 group-hover:scale-125 transition-transform"></div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-700">Authorized Connection</p>
                            <p className="text-[9px] text-slate-400 font-medium">Key ID: PR-281920-X{i}</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase">{i * 2}m ago</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Infrastructure Monitoring */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                <Server className="h-5 w-5 text-primary" />
                Infrastructure Monitoring
              </h2>
              <button className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest underline underline-offset-4 decoration-2 decoration-primary/20">
                View Detailed Logs
              </button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {systemMetrics.map((metric, idx) => (
                <div key={idx} className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md hover:border-primary/20 transition-all group">
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                    <metric.icon className="h-6 w-6 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{metric.label}</p>
                      <span className="text-[9px] font-black uppercase tracking-widest text-white bg-green-600 px-2 py-1 rounded-lg shadow-sm">{metric.status}</span>
                    </div>
                    <p className="text-2xl font-black tracking-tighter text-slate-900">{metric.value}</p>
                    <div className="mt-4 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden p-[1px]">
                      <div className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(255,0,0,0.3)] animate-pulse" style={{ width: idx % 2 === 0 ? '78%' : '42%' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar of Dashboard: Insights or Secondary Intel */}
        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <ShieldCheck className="h-32 w-32" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Threat Intelligence</h3>
              <div className="space-y-6 relative z-10">
                 <div className="pb-6 border-b border-white/10">
                    <p className="text-2xl font-black mb-1">Clean</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Environmental Status</p>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-[11px]">
                       <span className="text-slate-400 font-bold">SQL Injection Blocks</span>
                       <span className="font-black text-primary">1,204</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                       <span className="text-slate-400 font-bold">Bot Traffic Pruned</span>
                       <span className="font-black text-primary">42.8k</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                       <span className="text-slate-400 font-bold">Encryption Cycles</span>
                       <span className="font-black text-primary text-emerald-500">OPTIMAL</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
                 <Clock className="h-4 w-4 text-primary" />
                 Transmission Log
              </h3>
              <div className="space-y-5">
                 {[1,2,3].map(i => (
                    <div key={i} className="flex gap-4 items-start">
                       <div className="h-8 w-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                          <Activity className="h-4 w-4 text-slate-400" />
                       </div>
                       <div>
                          <p className="text-[11px] font-bold text-slate-700 leading-tight">Global data sync completed for region {i}</p>
                          <p className="text-[9px] text-slate-400 font-medium mt-1">Status Code: 200 OK</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
