"use client";

import Link from "next/link";
import styles from "./CampaignPageHeader.module.css";

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
          <p className={styles.subtitle}>{statusLabel[status]}s</p>
        </div>
        <nav className={styles.tabs}>
          <Link href={`/campaign/${slug}/notes`} className={styles.tab}>
            Anotações
          </Link>
          <Link href={`/campaign/${slug}/sessions`} className={styles.tab}>
            Sessões
          </Link>
          <Link href={`/campaign/${slug}/characters`} className={styles.tab}>
            Personagens
          </Link>
        </nav>
      </div>
    </header>
  );
}
