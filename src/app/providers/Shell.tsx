"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useUIStore } from "@/store/uiStore";
import styles from "./Shell.module.css";

interface ShellProps {
  children: React.ReactNode;
  session: Session | null;
}

export function Shell({ children, session }: ShellProps) {
  const [queryClient] = useState(() => new QueryClient());
  const isAsideCollapsed = useUIStore((state) => state.asideCollapsed);

  return (
    <SessionProvider session={session} refetchInterval={60}>
      <QueryClientProvider client={queryClient}>
        <div
          className={`${styles.dashboardWrapper} ${
            isAsideCollapsed ? styles.asideCollapsed : styles.asideExpanded
          }`}
        >
          {children}
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
