"use client";

import { useState } from "react";
import { 
  Settings, 
  Shield, 
  Database, 
  Bell, 
  Globe, 
  Lock, 
  Save, 
  RefreshCw,
  Server,
  Terminal,
  Cpu
} from "lucide-react";

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">System <span className="text-primary italic">Configuration</span></h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-bold opacity-60">Sovereign Node Parameters & Security Protocols</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-3 bg-primary text-white font-black uppercase text-xs rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.25)]"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Commit Global Changes
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Navigation Tabs - Left Side */}
        <div className="xl:col-span-3 space-y-2">
          {[
            { name: "General Parameters", icon: Settings, active: true },
            { name: "Sovereignty & Security", icon: Shield },
            { name: "Intelligence Database", icon: Database },
            { name: "Consensus Notifications", icon: Bell },
            { name: "Network Infrastructure", icon: Globe },
          ].map((tab, idx) => (
            <button 
              key={idx}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all border ${
                tab.active 
                  ? "bg-white border-slate-200 text-slate-900 shadow-sm font-bold" 
                  : "bg-transparent border-transparent text-slate-500 hover:bg-slate-100"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${tab.active ? "text-primary" : "text-slate-400"}`} />
              <span className="text-sm">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area - Right Side */}
        <div className="xl:col-span-9 space-y-8">
          {/* Section 1: Core Parameters */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
             <div className="p-6 border-b border-slate-100 bg-slate-50">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                   <Terminal className="h-4 w-4 text-primary" />
                   Core OS Parameters
                </h2>
             </div>
             <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Platform Identity Name</label>
                      <input 
                        type="text" 
                        defaultValue="Afconomy Sovereign Engine"
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:border-primary/40 outline-none text-slate-900 font-bold"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Operational Environment</label>
                      <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:border-primary/40 outline-none text-white font-bold cursor-pointer">
                        <option>Production (Lagos-DC)</option>
                        <option>Staging (Nairobi-Edge)</option>
                        <option>Development (Local-Host)</option>
                      </select>
                   </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">Maintenance Protocol</h4>
                      <p className="text-xs text-slate-500">Enable complete platform lockdown for scheduled core updates.</p>
                   </div>
                   <div className="h-6 w-11 bg-slate-200 rounded-full relative cursor-not-allowed">
                      <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>

          {/* Section 2: Security Thresholds */}
          <div className="bg-[#DCDCDC] border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
             <div className="p-6 border-b border-slate-200 bg-primary/10">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                   <Lock className="h-4 w-4 text-primary" />
                   Security & Access Thresholds
                </h2>
             </div>
             <div className="p-8 space-y-8">
                <div className="flex items-center gap-6">
                   <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center border border-slate-300 shadow-inner">
                      <Cpu className="h-8 w-8 text-primary opacity-40" />
                   </div>
                   <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-end">
                         <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Encryption Intensity</span>
                         <span className="text-xs font-bold text-slate-900">256-bit AES RSA</span>
                      </div>
                      <div className="h-2 w-full bg-white rounded-full border border-slate-300">
                         <div className="h-full w-3/4 bg-primary"></div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {[
                     { label: "Session Timeout", value: "30 Minutes", icon: Server },
                     { label: "Max Log Attempts", value: "3 Failures", icon: Shield },
                     { label: "IP Clearance", value: "Required", icon: Globe },
                   ].map((item, idx) => (
                     <div key={idx} className="p-4 bg-white/50 border border-slate-300 rounded-2xl">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-sm font-bold text-slate-900">{item.value}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
