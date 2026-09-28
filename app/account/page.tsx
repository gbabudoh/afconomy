import type { Metadata } from "next";
import PreferencesPanel from "@/components/PreferencesPanel";
import SiteHeader from "@/components/SiteHeader";
import { effectiveTier, getCurrentUser, hasRole } from "@/lib/session";

export const metadata: Metadata = { title: "Account — Afconomy" };

export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <>
      <SiteHeader canPublish={hasRole(user, "JOURNALIST")} />
      <main className="max-w-2xl mx-auto w-full p-4 py-8 space-y-6">
        {user ? (
          <>
            <div className="bg-af-panel border border-af-border rounded-xl p-5 flex items-center justify-between">
              <div>
                <div className="font-bold">{user.name ?? user.email}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-amber-300 text-amber-600">
                {effectiveTier(user)}
              </span>
            </div>
            <PreferencesPanel initial={user.preferences} />
          </>
        ) : (
          <p className="text-sm text-slate-500">Sign in to manage your terminal preferences.</p>
        )}
      </main>
    </>
  );
}
