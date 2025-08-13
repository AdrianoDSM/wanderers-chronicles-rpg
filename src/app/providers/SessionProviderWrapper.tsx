// src/app/providers/SessionProviderWrapper.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

export function SessionProviderWrapper({ children, session }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session} refetchInterval={60}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
