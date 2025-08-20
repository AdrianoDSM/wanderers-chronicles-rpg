"use client";

import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCampaignStore } from "@/store/useCampaignStore";
import { useCarouselStore } from "@/store/useCarouselStore";
import { CampaignCard } from "../CampaignCard/CampaignCard";
import { CampaignProps } from "@/types/models/Campaign";
import styles from "./CampaignList.module.css";
import { useResponsiveCards } from "@/hooks/useResponsiveCards";
import { ChevronLeft, ChevronRight } from "lucide-react";


export function CampaignList() {
  const { selectedCampaignId, setSelectedCampaign } = useCampaignStore();
  const { cardWidth, cardsPerPage, pageIndex, setPageIndex } =
    useCarouselStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: campaigns,
    isLoading,
    isError,
  } = useQuery<CampaignProps[]>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await fetch("/api/campaigns");
      if (!res.ok) throw new Error("Erro ao buscar campanhas");
      return res.json();
    },
  });

  useResponsiveCards(containerRef, campaigns?.length || 0);

  if (isLoading) return <p>Carregando campanhas...</p>;
  if (isError) return <p>Erro ao carregar campanhas.</p>;
  if (!campaigns || campaigns.length === 0)
    return <p>Nenhuma campanha encontrada</p>;

  const maxPageIndex = Math.max(
    0,
    Math.ceil(campaigns.length / cardsPerPage) - 1
  );

  const scrollToPage = (index: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: index * cardsPerPage * cardWidth,
      behavior: "smooth",
    });
    setPageIndex(index);
  };

  const handleLeft = () => scrollToPage(Math.max(0, pageIndex - 1));
  const handleRight = () => scrollToPage(Math.min(maxPageIndex, pageIndex + 1));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Suas campanhas</h2>
      </div>
      <div className={styles.carouselWrapper}>
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={handleLeft}
        disabled={pageIndex === 0}
      >
        <ChevronLeft size={28}/>
      </button>

      <div className={styles.inner} ref={containerRef}>
        {campaigns?.map((c) => (
          <CampaignCard
            key={c.id}
            campaign={c}
            isSelected={selectedCampaignId === c.id}
            onSelect={setSelectedCampaign}
          />
        ))}
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={handleRight}
        disabled={pageIndex === maxPageIndex}
      >
        <ChevronRight size={28}/>
      </button>
      </div>
    </div>
  );
}
