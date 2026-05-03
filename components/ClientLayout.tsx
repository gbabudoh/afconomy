"use client";

import { useEffect } from "react";
import { CountryProvider } from "@/lib/CountryContext";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isHomePage = pathname === "/";
  // Pages that render their own full-screen layout — hide the shared top Navbar.
  const isSectorPage = [
    "/economy", "/employment", "/trade", "/currency", "/finance", "/food", "/other",
    "/sectors", "/countries", "/calendar", "/settings",
  ].includes(pathname) || pathname.startsWith("/countries/");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  // Sector and sub-pages need bottom padding so content clears the floating nav.
  // Home page (Dashboard) is a fixed full-screen layout and handles its own spacing.
  const needsNavClearance = !isHomePage && !isAdminPage;

  return (
    <CountryProvider>
      <div className="flex flex-col relative bg-[#f5f5f7] lg:bg-transparent min-h-screen">
        {!isAdminPage && !isHomePage && !isSectorPage && <Navbar />}

        {/* Main content area */}
        <div
          className="flex-1"
          style={needsNavClearance
            ? { paddingBottom: "calc(82px + env(safe-area-inset-bottom, 0px))" }
            : undefined
          }
        >
          <div className="min-h-full bg-white lg:bg-transparent">
            {children}
          </div>
        </div>

        <MobileNav />
      </div>
    </CountryProvider>
  );
}
