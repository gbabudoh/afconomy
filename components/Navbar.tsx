"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, Bell, User, LogOut, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import CountryFilter from "./CountryFilter";
import { useCountry } from "@/lib/CountryContext";

export default function Navbar() {
  const { selectedCountries, setSelectedCountries } = useCountry();
  const [user, setUser] = useState<{ name: string; email: string; id: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 hover:bg-secondary/10 transition-colors lg:hidden">
            <Menu className="h-5 w-5 text-secondary" />
          </button>
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Afconomy"
              width={140}
              height={32}
              className="h-8 w-auto transition-opacity group-hover:opacity-90"
            />
          </Link>
        </div>

        <div className="hidden max-w-md flex-1 px-8 lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/60" />
            <input
              type="text"
              placeholder="Search markets, metrics, countries..."
              className="h-10 w-full rounded-lg border border-border bg-muted/50 pl-10 pr-4 text-sm text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CountryFilter 
            selectedCountries={selectedCountries}
            onCountriesChange={setSelectedCountries}
          />
          <button className="rounded-lg p-2 hover:bg-secondary/10 transition-colors relative group">
            <Bell className="h-5 w-5 text-secondary group-hover:text-primary transition-colors" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary border-2 border-card animate-pulse"></span>
          </button>
          <div className="h-6 w-px bg-border hidden sm:block"></div>
          
          {user ? (
            <div className="flex items-center gap-3 pl-2">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-xs font-bold text-foreground">{user.name}</span>
                <span className="text-[10px] text-secondary font-medium">Institutional Access</span>
              </div>
              <div className="group relative">
                <button className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-all text-primary">
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {user.role === "ADMIN" && (
                    <Link 
                      href="/admin"
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:text-red-500 hover:bg-red-500/5 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-95">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
