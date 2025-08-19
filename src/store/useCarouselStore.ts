import { create } from "zustand";

interface CarouselState {
  pageIndex: number;
  setPageIndex: (index: number) => void;

  cardsPerPage: number;
  setCardsPerPage: (count: number) => void;
  
  cardWidth: number;
  setCardWidth: (width: number) => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
  pageIndex: 0,
  setPageIndex: (index) => set({ pageIndex: index }),

  cardsPerPage: 1,
  setCardsPerPage: (count) => set({ cardsPerPage: count }),

  cardWidth: 300,
  setCardWidth: (width) => set({ cardWidth: width })
}));
