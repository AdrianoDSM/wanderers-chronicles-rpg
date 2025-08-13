import { create } from "zustand";

interface CampaignState {
  selectedCampaignId: string | null;
  setSelectedCampaign: (id: string | null) => void;
}

export const useCampaignStore = create<CampaignState>((set) => ({
  selectedCampaignId: null,
  setSelectedCampaign: (id) => set({ selectedCampaignId: id }),
}));
