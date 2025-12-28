"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Menu, Bell } from "lucide-react";
import CountryFilter from "./CountryFilter";

interface NavbarProps {
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;
}

export default function Navbar({ selectedCountries, onCountriesChange }: NavbarProps) {
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
            onCountriesChange={onCountriesChange}
          />
          <button className="rounded-lg p-2 hover:bg-secondary/10 transition-colors relative group">
            <Bell className="h-5 w-5 text-secondary group-hover:text-primary transition-colors" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary border-2 border-card animate-pulse"></span>
          </button>
          <div className="h-6 w-px bg-border hidden sm:block"></div>
          <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary/5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Market Pulse
          </button>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-95">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
