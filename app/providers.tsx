"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 5 seconds
            staleTime: 5_000,
            // Auto-poll every 10 seconds as a REST fallback for live data
            refetchInterval: 10_000,
            refetchOnWindowFocus: true,
            // Show previous data while refetching (no loading flash)
            placeholderData: (prev: unknown) => prev,
            retry: 3,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
