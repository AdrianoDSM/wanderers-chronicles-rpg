import { create } from "zustand";

type ModalKey = "campaign" | "session" | "character" | "note";

type ModalState = {
  openModals: Partial<Record<ModalKey, boolean>>;
  open: (key: ModalKey) => void;
  close: (key: ModalKey) => void;
  toggle: (key: ModalKey) => void;
  isOpen: (key: ModalKey) => boolean;
};

export const useCreateModalStore = create<ModalState>((set, get) => ({
  openModals: {},

  open: (key) =>
    set((state) => ({
      openModals: { ...state.openModals, [key]: true },
    })),

  close: (key) =>
    set((state) => ({
      openModals: { ...state.openModals, [key]: false },
    })),

  toggle: (key) =>
    set((state) => ({
      openModals: {
        ...state.openModals,
        [key]: !state.openModals[key],
      },
    })),

  isOpen: (key) => !!get().openModals[key],
}));