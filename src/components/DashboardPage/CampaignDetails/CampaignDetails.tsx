"use client";

import { useCampaignStore } from "@/store/useCampaignStore";
import { useQuery } from "@tanstack/react-query";
import type { CampaignProps } from "@/types/models/Campaign";
import { CampaignStatus } from "@/generated/prisma";
import styles from "./CampaignDetails.module.css";

export function CampaignDetails() {
  const { selectedCampaignId } = useCampaignStore();

  const {
    data: campaign,
    isLoading,
    isError,
  } = useQuery<CampaignProps | null>({
    queryKey: ["campaign", selectedCampaignId],
    queryFn: async () => {
      if (!selectedCampaignId) return null;
      const res = await fetch(`/api/campaigns/${selectedCampaignId}`);
      if (!res.ok) throw new Error("Erro ao buscar campanha");
      return res.json();
    },
    enabled: !!selectedCampaignId,
  });

  if (!selectedCampaignId) {
    return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Selecione uma campanha para ver os detalhes</h2>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.card}>
          <span>-</span>
          <p>Sessões Jogadas</p>
        </div>
        <div className={styles.card}>
          <span>-</span>
          <p>Personagens</p>
        </div>
        <div className={styles.card}>
          <span>-</span>
          <p>Anotações Feitas</p>
        </div>
      </div>
    </div>
    );
  }
  if (isLoading) {
    return (
      <div className={styles.container}>
      <div className={styles.header}>
        <h2>Carregando Detalhes ...</h2>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.card}>
          <span>-</span>
          <p>Sessões Jogadas</p>
        </div>
        <div className={styles.card}>
          <span>-</span>
          <p>Personagens</p>
        </div>
        <div className={styles.card}>
          <span>-</span>
          <p>Anotações Feitas</p>
        </div>
      </div>
    </div>
    );
  }
  if (isError || !campaign) return <p>Erro ao carregar detalhes</p>;

  const statusLabel = (() => {
    switch (campaign.status) {
      case CampaignStatus.ACTIVE:
        return "Ativo";
      case CampaignStatus.PAUSED:
        return "Pausado";
      case CampaignStatus.FINISHED:
        return "Finalizado";
      default:
        return "";
    }
  })();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{campaign.name}</h2>
        <p>{statusLabel}</p>
      </div>
      <div className={styles.description}>
        <p>{campaign.description || "Sem descrição"}</p>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.card}>
          <span>{campaign.sessions?.length || 0}</span>
          <p>Sessões Jogadas</p>
        </div>
        <div className={styles.card}>
          <span>{campaign.characters?.length || 0}</span>
          <p>Personagens</p>
        </div>
        <div className={styles.card}>
          <span>{campaign.notes?.length || 0}</span>
          <p>Anotações Feitas</p>
        </div>
      </div>
      <small className={styles.createdAt}>
        Criada em: {new Date(campaign.createdAt).toLocaleDateString("pt-BR")}
      </small>
    </div>
  );
}
