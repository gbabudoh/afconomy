"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3, Briefcase, Ship, Coins, CircleDollarSign, UtensilsCrossed, Layers,
  Globe, CalendarDays, ChevronRight, LucideIcon,
} from "lucide-react";

/* ─── Explore items (full-page nav) ─────────────────────────── */
const EXPLORE_ITEMS = [
  {
    id: "countries",
    label: "Countries",
    sub: "54 African markets",
    icon: Globe,
    href: "/countries",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    dotColor: "bg-blue-500",
  },
  {
    id: "calendar",
    label: "Calendar",
    sub: "Economic events",
    icon: CalendarDays,
    href: "/calendar",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
    dotColor: "bg-violet-500",
  },
] as const;

/* ─── Market sector categories ───────────────────────────────── */
interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

const CATEGORIES: Category[] = [
  { id: "economy",    label: "Economy",        icon: BarChart3 },
  { id: "employment", label: "Employment",      icon: Briefcase },
  { id: "trade",      label: "Import & Export", icon: Ship },
  { id: "currency",   label: "Currency",        icon: Coins },
  { id: "finance",    label: "Finance",          icon: CircleDollarSign },
  { id: "food",       label: "Food Security",    icon: UtensilsCrossed },
  { id: "other",      label: "Other Sectors",    icon: Layers },
];

interface GlassSidebarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function GlassSidebar({ activeCategory, onCategoryChange }: GlassSidebarProps) {
  const [isLoggedIn] = useState(false); // Mock state for flow demonstration

  return (
    <aside className="w-80 bg-[#fafafa] border-l border-black/10 h-full flex flex-col overflow-y-auto shadow-2xl no-scrollbar">

      {/* ── Explore ───────────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-4">
        <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-3">Explore</p>
        <div className="flex flex-col gap-2">
          {EXPLORE_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-white hover:shadow-md hover:ring-1 hover:ring-black/5 transition-all duration-200"
              >
                <div className={`p-2.5 rounded-xl ${item.iconBg} shrink-0 transition-all duration-200 group-hover:scale-105`}>
                  <item.icon className={`h-4.5 w-4.5 ${item.iconColor}`} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-black/80 group-hover:text-black transition-colors leading-tight">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-black/35 font-medium mt-0.5">{item.sub}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-black/20 group-hover:text-black/40 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="mx-5 h-px bg-black/6" />

      {/* ── Market Sectors ────────────────────────────────────── */}
      <div className="px-5 pt-4 pb-4 flex-1">
        <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-3">Market Sectors</p>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={`/${cat.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (EXPLORE_ITEMS.length * 0.06) + i * 0.045 }}
              onClick={() => onCategoryChange(cat.id)}
              className={`group relative flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-white shadow-md ring-1 ring-black/5"
                  : "hover:bg-black/5 border border-transparent hover:border-black/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-black/5 text-black/40 group-hover:text-black/70"
                }`}>
                  <cat.icon className="h-4 w-4" />
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
            </motion.a>
          ))}
        </div>
      </div>

      {/* ─── Account / Intelligence Unit ────────────────────────── */}
      <div className="px-5 pb-6 pt-2">
        <div className="rounded-2xl p-4 border border-black/5 bg-black/[0.02]">
          <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-1.5">Intelligence Unit</p>
          <p className="text-xs text-black/60 leading-relaxed font-medium">
            Join the elite network of African economic researchers and analysts.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <Link href="/register" className="w-full py-2.5 bg-black text-white text-[10px] font-black rounded-xl hover:bg-black/90 transition-all active:scale-95 shadow-lg shadow-black/10 flex items-center justify-center uppercase tracking-widest">
              Create Account
            </Link>
            <Link href="/login" className="w-full py-2.5 bg-white border border-black/5 text-black/60 text-[10px] font-black rounded-xl hover:bg-black/5 transition-all flex items-center justify-center uppercase tracking-widest">
              Member Login
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
