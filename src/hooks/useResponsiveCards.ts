import { useCarouselStore } from "@/store/useCarouselStore";
import { useEffect } from "react";

export function useResponsiveCards(containerRef: React.RefObject<HTMLElement>, campaignsLength: number) {
  const { setCardWidth, setCardsPerPage } = useCarouselStore();

  useEffect(() => {
    if (!containerRef.current || campaignsLength === 0) return;

    const calculateLayout = () => {
      const firstCard = containerRef.current?.children[0] as HTMLElement;
      if (!firstCard) return;
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const cWidth = firstCard.clientWidth + 16; // + gap
      setCardWidth(cWidth);
      setCardsPerPage(Math.floor(containerWidth / cWidth));
    };

    const observer = new ResizeObserver(calculateLayout);
    observer.observe(containerRef.current);

    calculateLayout();

    return () => observer.disconnect();
  }, [containerRef, campaignsLength, setCardWidth, setCardsPerPage]);
}
