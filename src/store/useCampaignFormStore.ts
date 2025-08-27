import { create } from "zustand";

type CampaignFormState = {
  customSystem: string;
  setCustomSystem: (value: string) => void;
  resetCustomSystem: () => void;
};

export const useCampaignFormStore = create<CampaignFormState>((set) => ({
  customSystem: "",
  setCustomSystem: (value) => set({ customSystem: value }),
  resetCustomSystem: () => set({ customSystem: "" }),
}));
