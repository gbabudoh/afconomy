import type { Metadata } from "next";
import PublishForm from "@/components/PublishForm";
import SiteHeader from "@/components/SiteHeader";
import { getCurrentUser, hasRole } from "@/lib/session";

export const metadata: Metadata = { title: "Publish — Afconomy Newsroom" };

export default async function PublishPage() {
  const user = await getCurrentUser();
  const author = hasRole(user, "JOURNALIST") ? user?.author : null;

  return (
    <>
      <SiteHeader canPublish={!!author} />
      <main className="w-full p-4 py-8">
        {author ? (
          <PublishForm authorName={author.name} />
        ) : (
          <p className="text-center text-sm text-slate-500">
            The newsroom is restricted to journalists with an author profile.
          </p>
        )}
      </main>
    </>
  );
}
