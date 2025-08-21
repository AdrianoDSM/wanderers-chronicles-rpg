import { create } from "zustand"

interface UIState {
  asideCollapsed: boolean
  toggleAside: () => void
  setAsideCollapsed: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  asideCollapsed: false,
  toggleAside: () => set((state) => ({ asideCollapsed: !state.asideCollapsed })),
  setAsideCollapsed: (value) => set({ asideCollapsed: value })
}))
