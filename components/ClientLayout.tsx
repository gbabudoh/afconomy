"use client";

import { CountryProvider } from "@/lib/CountryContext";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CountryProvider>
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </CountryProvider>
  );
}
