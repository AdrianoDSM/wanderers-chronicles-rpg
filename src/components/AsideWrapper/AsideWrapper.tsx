"use client";

import { useUIStore } from "@/store/uiStore";
import styles from "../DashboardAside/dashboardAside.module.css";
import { DashboardAside } from "../DashboardAside/DashboardAside";
import type { Campaign } from "@/generated/prisma";

export function AsideWrapper({campaigns}: {campaigns: Campaign[]}) {
  const asideCollapsed = useUIStore((state) => state.asideCollapsed);

  return (
    <aside
      className={`${styles.aside} ${asideCollapsed ? styles.collapsed : ""}`}
    >
      <DashboardAside campaigns={campaigns}/>
    </aside>
  );
}
