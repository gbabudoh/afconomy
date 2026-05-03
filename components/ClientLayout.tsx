"use client";

import { CountryProvider } from "@/lib/CountryContext";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isHomePage = pathname === "/";

  return (
    <CountryProvider>
      <div className="h-[100dvh] flex flex-col overflow-hidden">
        {!isAdminPage && !isHomePage && <Navbar />}
        <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
      </div>
    </CountryProvider>
  );
}
