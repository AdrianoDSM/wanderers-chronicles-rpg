"use client";

import { useCreateModalStore } from "@/store/useCreateModalStore";
import styles from "./dashboardHeader.module.css";
import { useSession } from "next-auth/react";

export const DashboardHeader = () => {
  const openModal = useCreateModalStore((state) => state.open);
  const { data: session } = useSession();
  const userName = session?.user?.name || "Usuário";
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Dashboard Principal</h1>
          <p className={styles.subtitle}>Visão geral das suas campanhas</p>
        </div>
        <div className={styles.headerButtons}>
          <button
            onClick={() => openModal("campaign")}
            className={styles.createCampaignButton}
          >
            Nova Campanha
          </button>
          <button className={styles.profileButton}>{userName.charAt(0)}</button>
        </div>
      </div>
    </header>
  );
};
