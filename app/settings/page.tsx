"use client";

import { motion } from "framer-motion";
import {
  Bell, Moon, Globe, Shield, HelpCircle, LogOut, ChevronRight,
  User, Smartphone, Database, Mail,
} from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", sub: "Manage your identity", href: "/login" },
      { icon: Mail, label: "Email Preferences", sub: "Newsletters & alerts", href: "#" },
    ],
  },
  {
    title: "App",
    items: [
      { icon: Bell, label: "Notifications", sub: "Push & in-app alerts", href: "#" },
      { icon: Moon, label: "Appearance", sub: "Light mode active", href: "#" },
      { icon: Globe, label: "Region & Language", sub: "Africa / English", href: "#" },
    ],
  },
  {
    title: "Data",
    items: [
      { icon: Database, label: "Data Sources", sub: "Verify intelligence feeds", href: "#" },
      { icon: Smartphone, label: "Offline Mode", sub: "Download for offline access", href: "#" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: Shield, label: "Privacy & Security", sub: "Permissions & data policy", href: "#" },
      { icon: HelpCircle, label: "Help Center", sub: "FAQs and contact", href: "#" },
    ],
  },
];

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-black">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 pt-8 pb-5 border-b border-black/5">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Afconomy</p>
          <h1 className="text-3xl font-black tracking-tight">Settings</h1>
        </motion.div>
      </div>

      {/* Sections */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-4 sm:px-6 py-5 flex flex-col gap-6"
      >
        {SECTIONS.map((section) => (
          <motion.div key={section.title} variants={item}>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/35 mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/[0.04]">
              {section.items.map((row, i) => (
                <Link
                  key={row.label}
                  href={row.href}
                  className={`flex items-center gap-3.5 px-4 py-3.5 active:bg-black/5 transition-colors ${
                    i < section.items.length - 1 ? "border-b border-black/[0.05]" : ""
                  }`}
                >
                  <div className="h-9 w-9 rounded-xl bg-black/[0.04] flex items-center justify-center shrink-0">
                    <row.icon className="h-4.5 w-4.5 text-black/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black leading-tight">{row.label}</p>
                    <p className="text-[11px] text-black/35 font-medium mt-0.5 truncate">{row.sub}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-black/20 shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Sign out */}
        <motion.div variants={item}>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white text-red-500 font-black text-sm ring-1 ring-black/[0.04] active:bg-red-50 transition-colors shadow-sm"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </motion.div>

        <motion.div variants={item} className="text-center pb-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-black/20">
            Afconomy Intelligence Unit · v1.0
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
