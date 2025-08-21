"use client";

import { useUIStore } from "@/store/uiStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./collapseAsideButton.module.css";

export function CollapseAsideButton() {
  const asideCollapsed = useUIStore((state) => state.asideCollapsed);
  const toggleAside = useUIStore((state) => state.toggleAside);

  return (
    <button onClick={toggleAside} className={styles.collapseButton}>
      {asideCollapsed ? <ChevronRight /> : <ChevronLeft />}
    </button>
  );
}
