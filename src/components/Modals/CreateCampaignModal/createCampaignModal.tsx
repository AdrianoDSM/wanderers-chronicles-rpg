"use client";

import styles from "./createCampaignModal.module.css";
import { CreateCampaignForm } from "./CreateCampaignForm/createCampaignForm";
import { useCreateModalStore } from "@/store/useCreateModalStore";

export function CreateCampaignModal() {
  const { close, isOpen } = useCreateModalStore();
  const isCampaignOpen = isOpen('campaign')
  if (!isCampaignOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => close("campaign")}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <h2 className={styles.title}>Crie sua Campanha</h2>
        <p className={styles.subtitle}>Comece aqui a documentar sua campanha</p>
        <CreateCampaignForm />
      </div>
    </div>
  );
}
