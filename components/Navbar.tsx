"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, User, LogOut, Shield, X, TrendingUp, BarChart3, Globe, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import CountryFilter from "./CountryFilter";
import { useCountry } from "@/lib/CountryContext";

export default function Navbar() {
  const { selectedCountries, setSelectedCountries } = useCountry();
  const [user, setUser] = useState<{ name: string; email: string; id: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setMobileMenuOpen(false);
    router.refresh();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md shadow-sm flex-shrink-0">
        <div className="mx-auto flex h-14 sm:h-16 max-w-[1600px] items-center justify-between px-3 sm:px-4 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 hover:bg-secondary/10 transition-colors lg:hidden"
            >
              <Menu className="h-5 w-5 text-secondary" />
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="Afconomy"
                width={120}
                height={28}
                className="h-6 sm:h-8 w-auto transition-opacity group-hover:opacity-90"
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 flex-1 px-4 lg:px-8">
            <Link href="/calendar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:text-foreground hover:bg-secondary/10 transition-colors">
              <Calendar className="h-4 w-4" />
              Calendar
            </Link>
            <Link href="/countries" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:text-foreground hover:bg-secondary/10 transition-colors">
              <Globe className="h-4 w-4" />
              Countries
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block lg:hidden max-w-md flex-1 px-4 lg:px-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/60" />
              <input
                type="text"
                placeholder="Search markets, metrics..."
                className="h-9 sm:h-10 w-full rounded-lg border border-border bg-muted/50 pl-10 pr-4 text-sm text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            <button className="md:hidden rounded-lg p-2 hover:bg-secondary/10 transition-colors">
              <Search className="h-4 w-4 text-secondary" />
            </button>
            
            {/* Country Filter - Hidden on small mobile */}
            <div className="hidden sm:block">
              <CountryFilter 
                selectedCountries={selectedCountries}
                onCountriesChange={setSelectedCountries}
              />
            </div>
            <div className="h-4 sm:h-6 w-px bg-border hidden sm:block"></div>
            
            {loading ? (
              <div className="h-9 sm:h-10 w-24 bg-primary/5 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="hidden sm:flex items-center gap-2 sm:gap-3 pl-2">
                <div className="flex flex-col items-end hidden md:flex">
                  <span className="text-xs font-bold text-foreground">{user.name}</span>
                  <span className="text-[10px] text-secondary font-medium">Institutional Access</span>
                </div>
                <div className="group relative">
                  <button className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-all text-primary cursor-pointer">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
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
              <Link href="/login" className="hidden sm:block">
                <button className="rounded-lg bg-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute left-0 top-0 h-full w-[280px] bg-card border-r border-border shadow-xl animate-in slide-in-from-left duration-300">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Image
                src="/logo.png"
                alt="Afconomy"
                width={100}
                height={24}
                className="h-6 w-auto"
              />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-secondary/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-secondary" />
              </button>
            </div>

            {/* User Section */}
            {user ? (
              <div className="p-4 border-b border-border bg-secondary/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{user.name}</p>
                    <p className="text-xs text-secondary">{user.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border-b border-border">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
                    Sign In
                  </button>
                </Link>
              </div>
            )}

            {/* Country Filter in Mobile Menu */}
            <div className="p-4 border-b border-border">
              <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Select Countries</p>
              <CountryFilter 
                selectedCountries={selectedCountries}
                onCountriesChange={setSelectedCountries}
              />
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-1">
              <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Navigation</p>
              
              <Link 
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer"
              >
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Dashboard</span>
              </Link>
              
              <Link 
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer"
              >
                <BarChart3 className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium text-foreground">Markets</span>
              </Link>
              
              <Link
                href="/calendar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer"
              >
                <Calendar className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium text-foreground">Economic Calendar</span>
              </Link>

              <Link
                href="/countries"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer"
              >
                <Globe className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium text-foreground">Country Profiles</span>
              </Link>
            </div>

            {/* Footer Actions */}
            {user && (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
                {user.role === "ADMIN" && (
                  <Link 
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/5 transition-colors mb-1"
                  >
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-primary">Admin Panel</span>
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-500/5 transition-colors w-full"
                >
                  <LogOut className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium text-red-500">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
