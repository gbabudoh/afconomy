"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Briefcase, 
  Ship, 
  Coins, 
  CircleDollarSign, 
  UtensilsCrossed, 
  Layers,
  LucideIcon
} from "lucide-react";

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

const CATEGORIES: Category[] = [
  { id: "economy", label: "Economy", icon: BarChart3 },
  { id: "employment", label: "Employment", icon: Briefcase },
  { id: "trade", label: "Import & Export", icon: Ship },
  { id: "currency", label: "Currency", icon: Coins },
  { id: "finance", label: "Finance", icon: CircleDollarSign },
  { id: "food", label: "Food Security", icon: UtensilsCrossed },
  { id: "other", label: "Other Sectors", icon: Layers },
];

interface GlassSidebarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function GlassSidebar({ activeCategory, onCategoryChange }: GlassSidebarProps) {
  return (
    <aside className="w-80 bg-[#fafafa] border-l border-black/10 h-full flex flex-col p-6 gap-4 overflow-y-auto shadow-2xl">
      <div className="mb-4">
        <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-1">Intelligence</p>
        <h2 className="text-xl font-black text-black tracking-tight">Market Sectors</h2>
      </div>
      
      <div className="flex flex-col gap-2.5">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onCategoryChange(cat.id)}
            className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
              activeCategory === cat.id 
                ? "bg-white shadow-lg ring-1 ring-black/5" 
                : "hover:bg-black/5 border border-transparent hover:border-black/5"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                activeCategory === cat.id ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-black/5 text-black/40 group-hover:text-black/70"
              }`}>
                <cat.icon className="h-5 w-5" />
              </div>
              <span className={`text-sm font-bold tracking-tight transition-colors ${
                activeCategory === cat.id ? "text-black" : "text-black/40 group-hover:text-black/70"
              }`}>
                {cat.label}
              </span>
            </div>
            
            {activeCategory === cat.id && (
              <motion.div 
                layoutId="active-pill"
                className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(255,2,1,0.5)]"
              />
            )}
          </motion.button>
        ))}
      </div>
      
      <div className="mt-auto pt-8">
        <div className="rounded-2xl p-5 border border-primary/10 bg-primary/5">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Pro Access</p>
          <p className="text-xs text-black/60 leading-relaxed font-medium">
            Unlock deep-dive analytics and historical data across 54 countries.
          </p>
          <button className="mt-4 w-full py-2.5 bg-black text-white text-xs font-black rounded-xl hover:bg-black/90 transition-all active:scale-95">
            Upgrade Account
          </button>
        </div>
      </div>
    </aside>
  );
}
