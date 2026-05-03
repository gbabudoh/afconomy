"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Layers, Globe, CalendarDays, Settings, ChevronLeft,
} from "lucide-react";

/** Pages that are direct tab destinations — no back button needed here. */
const ROOT_PATHS = new Set(["/", "/sectors", "/countries", "/calendar", "/settings"]);

const NAV_ITEMS = [
  { label: "Home",      icon: LayoutDashboard, href: "/"         },
  { label: "Markets",   icon: Layers,           href: "/sectors"  },
  { label: "Countries", icon: Globe,             href: "/countries"},
  { label: "Calendar",  icon: CalendarDays,      href: "/calendar" },
  { label: "Settings",  icon: Settings,          href: "/settings" },
] as const;

export default function MobileNav() {
  const pathname = usePathname();
  const showBack = !ROOT_PATHS.has(pathname);

  return (
    <>
      {/* Back button — only on sector detail and other deep pages */}
      {showBack && (
        <button
          onClick={() => window.history.back()}
          className="lg:hidden fixed left-4 z-[101] h-10 w-10 rounded-2xl bg-white/92 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.10)] border border-black/[0.06] flex items-center justify-center active:scale-90 transition-transform duration-150"
          style={{ top: "max(16px, calc(env(safe-area-inset-top) + 8px))" }}
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5 text-black" strokeWidth={2.2} />
        </button>
      )}

      {/* Floating island */}
      <nav className="lg:hidden fixed inset-x-0 bottom-0 z-[100] pointer-events-none">
        <div
          className="px-4 pointer-events-auto"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        >
          <div className="bg-white/92 backdrop-blur-3xl rounded-[22px] border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.13),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="flex h-[58px]">
              {NAV_ITEMS.map((navItem) => {
                const isActive =
                  navItem.href === "/"
                    ? pathname === "/"
                    : pathname === navItem.href || pathname.startsWith(navItem.href + "/");

                return (
                  <Link
                    key={navItem.href}
                    href={navItem.href}
                    className="flex-1 flex flex-col items-center justify-center gap-[3px] relative group select-none"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-bg"
                        className="absolute inset-x-1.5 inset-y-1.5 rounded-[14px] bg-primary/[0.08]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}

                    <navItem.icon
                      className={`relative z-10 transition-all duration-200 ease-out ${
                        isActive ? "text-primary" : "text-black/30 group-active:text-black/55"
                      }`}
                      style={{ width: 19, height: 19 }}
                      strokeWidth={isActive ? 2.5 : 1.75}
                    />
                    <span
                      className={`relative z-10 text-[9px] font-semibold leading-none tracking-wide transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-black/30 group-active:text-black/55"
                      }`}
                    >
                      {navItem.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
