import { create } from "zustand";

type ImageState = {
  file: File | null;
  previewUrl: string | null;
  setImage: (file: File, url: string) => void;
  clearImage: () => void;
};

export const useImageStore = create<ImageState>((set) => ({
  file: null,
  previewUrl: null,
  setImage: (file, url) => set({ file, previewUrl: url }),
  clearImage: () => set({ file: null, previewUrl: null }),
}));
