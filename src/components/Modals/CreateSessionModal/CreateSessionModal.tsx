"use client";

import styles from "./createSessionModal.module.css";
import { CreateSessionForm } from "./CreateSessionForm/CreateSessionForm";
import { useCreateModalStore } from "@/store/useCreateModalStore";

export function CreateSessionModal() {
  const isSessionOpen = useCreateModalStore((s) => s.isOpen("session"));
  const closeSessionModal = useCreateModalStore((s) => s.close);

  if (!isSessionOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => closeSessionModal("session")}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <h2 className={styles.title}>Crie sua Sessão</h2>
        <p className={styles.subtitle}>Documente sua sessão para registrar seus feitos</p>
        <CreateSessionForm />
      </div>
    </div>
  );
}
