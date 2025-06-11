import { create } from 'zustand'

type CreateCampaignStore = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useCreateCampaignStore = create<CreateCampaignStore>((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),
}))