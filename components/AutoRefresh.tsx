"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Re-renders the server page on an interval, e.g. to pick up a show going live. */
export default function AutoRefresh({ seconds = 15 }: { seconds?: number }) {
  const router = useRouter();
  useEffect(() => {
    const id = setInterval(() => router.refresh(), seconds * 1000);
    return () => clearInterval(id);
  }, [router, seconds]);
  return null;
}
