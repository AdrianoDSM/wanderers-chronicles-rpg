"use client";

import styles from "./createCharacterModal.module.css";
import { CreateCharacterForm } from "./CreateCharacterForm/CreateCharacterForm";
import { useCreateModalStore } from "@/store/useCreateModalStore";
import { useImageStore } from "@/store/useImageStore";

export function CreateCharacterModal() {
  const isCharacterOpen = useCreateModalStore((s) => s.isOpen("character"));
  const closeCharacterModal = useCreateModalStore((s) => s.close);
  const { clearImage } = useImageStore.getState();

  if (!isCharacterOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => {
        clearImage()
        closeCharacterModal("character")
        }}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <h2 className={styles.title}>Crie seu Personagem</h2>
        <p className={styles.subtitle}>Registre um dos participantes da sua história</p>
        <CreateCharacterForm />
      </div>
    </div>
  );
}
