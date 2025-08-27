"use client";

import Link from "next/link";
import styles from "./CampaignPageHeader.module.css";
import { Settings } from "lucide-react";

interface Props {
  name: string;
  status: "ACTIVE" | "PAUSED" | "FINISHED";
  slug: string;
}

export function CampaignPageHeader({ name, status, slug }: Props) {
  const statusLabel = {
    ACTIVE: "Ativa",
    PAUSED: "Pausada",
    FINISHED: "Finalizada",
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.subtitle}>{statusLabel[status]}</p>
        </div>
        <nav className={styles.tabs}>
          <Link href={`/campaigns/${slug}/notes`} className={styles.tab}>
            Anotações
          </Link>
          <Link href={`/campaigns/${slug}/sessions`} className={styles.tab}>
            Sessões
          </Link>
          <Link href={`/campaigns/${slug}/characters`} className={styles.tab}>
            Personagens
          </Link>
        </nav>
        <div>
          <Link href={`/campaigns/${slug}/settings`} className={styles.settings}>
            <Settings/>
            <span>Editar Campanha</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
