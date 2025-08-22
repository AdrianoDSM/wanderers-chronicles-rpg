"use client";

import { useUIStore } from "@/store/uiStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CollapseAsideButtonWrapper.module.css";

export function CollapseAsideButtonWrapper() {
  const asideCollapsed = useUIStore((state) => state.asideCollapsed);
  const toggleAside = useUIStore((state) => state.toggleAside);

  return (
    <button onClick={toggleAside} className={styles.wrapperButton}>
      {asideCollapsed ? <ChevronRight /> : <ChevronLeft />}
    </button>
  );
}
