'use client'

import { BookOpen, ChevronsRight, ScrollText, UserRoundPlus } from "lucide-react";
import styles from "./CampaignQuickActions.module.css";
import { useCreateModalStore } from "@/store/useCreateModalStore";

export default function CampaignQuickActions() {
  const openModal = useCreateModalStore((state) => state.open);
  return (
    <div className={styles.quickActionsContainer}>
      <p className={styles.title}>Ações Rápidas</p>
      <div className={styles.cardWrapper}>
        <div className={styles.card} onClick={() => openModal("session")}>
          <div className={styles.cardContent}>
            <BookOpen size={40}/>
            <div>
              <p>Nova Sessão</p>
              <span>Documente sua próxima aventura</span>
            </div>
          </div>
          <ChevronsRight size={30}/>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <ScrollText size={40}/>
            <div>
              <p>Nova Anotação</p>
              <span>Adicione notas e lembretes</span>
            </div>
          </div>
          <ChevronsRight size={30}/>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <UserRoundPlus size={40}/>
            <div>
              <p>Novo Personagem</p>
              <span>Crie NPCs ou PCs</span>
            </div>
          </div>
          <ChevronsRight size={30}/>
        </div>
      </div>
    </div>
  );
}
