"use client";

import styles from "./createCampaignModal.module.css";
import { CreateCampaignForm } from "../CreateCampaignForm/createCampaignForm";
import { useCreateCampaignStore } from "@/store/useCreateCampaignStore";


export function CreateCampaignModal() {
  const isOpen = useCreateCampaignStore((s) => s.isOpen);
  const close = useCreateCampaignStore((s) => s.close);

  if (!isOpen) return null;


  return (
    <div className={styles.overlay} onClick={close}>
      <div 
      className={styles.modal}
      onClick={(e)=> e.stopPropagation()}
      tabIndex={-1}>
        <h2 className={styles.title}>Crie sua Campanha</h2>
        <p className={styles.subtitle}>Nomeie e descreva brevemente sua campanha</p>

        <CreateCampaignForm/>
      </div>
    </div>
  );
}
