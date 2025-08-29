import { create } from "zustand";

interface CampaignPlayersState {
  playerCount: number;
  playerNames: string[];
  setPlayerCount: (count: number) => void;
  setPlayerName: (index: number, name: string) => void;
  resetPlayers: () => void;
}

export const useCampaignPlayersStore = create<CampaignPlayersState>((set) => ({
  playerCount: 0,
  playerNames: [],
  setPlayerCount: (count) => {
    const safeCount = Math.min(Math.max(count, 0), 10);
    set(() => ({
      playerCount: safeCount,
      playerNames: Array(count).fill(""),
    }));
  },
  setPlayerName: (index, name) =>
    set((state) => {
      const updated = [...state.playerNames];
      updated[index] = name;
      return { playerNames: updated };
    }),
  resetPlayers: () => set({ playerCount: 0, playerNames: [] }),
}));
