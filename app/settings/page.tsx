"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bell, Moon, Globe, Shield, HelpCircle, LogOut, LogIn, ChevronRight,
  User, Smartphone, Database, Mail, UserPlus,
} from "lucide-react";
import Link from "next/link";

const SECTIONS = [
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
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then(res => res.json())
      .then(data => { if (data.user) setUser(data.user); })
      .catch(() => {})
      .finally(() => setAuthLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-black">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 pt-8 pb-5 border-b border-black/5">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Afconomy</p>
          <h1 className="text-3xl font-black tracking-tight">Settings</h1>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-4 sm:px-6 py-5 flex flex-col gap-6"
      >
        {/* Account card — context-aware */}
        <motion.div variants={item}>
          <p className="text-[10px] font-black uppercase tracking-widest text-black/35 mb-2 px-1">Account</p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/4">
            {authLoading ? (
              <div className="px-4 py-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-black/5 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 bg-black/5 rounded animate-pulse" />
                  <div className="h-2.5 w-20 bg-black/5 rounded animate-pulse" />
                </div>
              </div>
            ) : user ? (
              <>
                {/* Logged-in profile row */}
                <div className="px-4 py-4 flex items-center gap-3 border-b border-black/5">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-black leading-tight truncate">{user.name}</p>
                    <p className="text-[11px] text-black/35 font-medium mt-0.5 truncate">{user.email}</p>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-lg shrink-0">
                    {user.role === "ADMIN" ? "Admin" : "Member"}
                  </span>
                </div>
                <Link
                  href="#"
                  className="flex items-center gap-3.5 px-4 py-3.5 active:bg-black/5 transition-colors"
                >
                  <div className="h-9 w-9 rounded-xl bg-black/[0.04] flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-black/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black leading-tight">Email Preferences</p>
                    <p className="text-[11px] text-black/35 font-medium mt-0.5">Newsletters & alerts</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-black/20 shrink-0" />
                </Link>
              </>
            ) : (
              <>
                {/* Guest — invite to join */}
                <div className="px-4 py-4 flex items-center gap-3 border-b border-black/5">
                  <div className="h-12 w-12 rounded-2xl bg-black/5 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-black/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-black leading-tight">Guest</p>
                    <p className="text-[11px] text-black/35 font-medium mt-0.5">Browsing without an account</p>
                  </div>
                </div>
                <Link
                  href="/login"
                  className="flex items-center gap-3.5 px-4 py-3.5 active:bg-black/5 transition-colors border-b border-black/5"
                >
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <LogIn className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black leading-tight">Sign In</p>
                    <p className="text-[11px] text-black/35 font-medium mt-0.5">Access your account</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-black/20 shrink-0" />
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-3.5 px-4 py-3.5 active:bg-black/5 transition-colors"
                >
                  <div className="h-9 w-9 rounded-xl bg-black/[0.04] flex items-center justify-center shrink-0">
                    <UserPlus className="h-4 w-4 text-black/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black leading-tight">Create Account</p>
                    <p className="text-[11px] text-black/35 font-medium mt-0.5">Join the Intelligence Unit</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-black/20 shrink-0" />
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* App / Data / Support sections */}
        {SECTIONS.map((section) => (
          <motion.div key={section.title} variants={item}>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/35 mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/4">
              {section.items.map((row, i) => (
                <Link
                  key={row.label}
                  href={row.href}
                  className={`flex items-center gap-3.5 px-4 py-3.5 active:bg-black/5 transition-colors ${
                    i < section.items.length - 1 ? "border-b border-black/5" : ""
                  }`}
                >
                  <div className="h-9 w-9 rounded-xl bg-black/[0.04] flex items-center justify-center shrink-0">
                    <row.icon className="h-4 w-4 text-black/50" />
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

        {/* Sign out — only show when logged in */}
        {user && (
          <motion.div variants={item}>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white text-red-500 font-black text-sm ring-1 ring-black/4 active:bg-red-50 transition-colors shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </motion.div>
        )}

        <motion.div variants={item} className="text-center pb-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-black/20">
            Afconomy Intelligence Unit · v1.0
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
