"use client";

import styles from "./createNoteModal.module.css";
import { CreateNoteForm } from "./CreateNoteForm/CreateNoteForm";
import { useCreateModalStore } from "@/store/useCreateModalStore";

export function CreateNoteModal() {
  const isNoteOpen = useCreateModalStore((s) => s.isOpen("note"));
  const closeNoteModal = useCreateModalStore((s) => s.close);

  if (!isNoteOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => {
        closeNoteModal("note")
        }}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <h2 className={styles.title}>Crie sua Nota</h2>
        <p className={styles.subtitle}>Relembre os acontecimentos e planejamentos de sua campanha</p>
        <CreateNoteForm />
      </div>
    </div>
  );
}
