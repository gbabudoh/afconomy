"use client";

import { CountryProvider } from "@/lib/CountryContext";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CountryProvider>
      <div className="h-[100dvh] flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      </div>
    </CountryProvider>
  );
}
