"use client";

import { useQuery } from "@tanstack/react-query";
import { useCampaignStore } from "@/store/useCampaignStore";
import { CampaignCard } from "../CampaignCard/CampaignCard";
import { CampaignProps } from "@/types/models/Campaign";

export function CampaignList() {
  const { selectedCampaignId, setSelectedCampaign } = useCampaignStore();

  const { data: campaigns, isLoading, isError } = useQuery<CampaignProps[]>({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await fetch("/api/campaigns");
      if (!res.ok) throw new Error("Erro ao buscar campanhas");
      return res.json();
    },
  });

  if (isLoading) return <p>Carregando campanhas...</p>;
  if (isError) return <p>Erro ao carregar campanhas.</p>;
  if (!campaigns || campaigns.length === 0) return <p>Nenhuma campanha encontrada</p>

  return (
    <div>
      {campaigns?.map((c) => (
        <CampaignCard
          key={c.id}
          campaign={c}
          isSelected={selectedCampaignId === c.id}
          onSelect={setSelectedCampaign}
        />
      ))}
    </div>
  );
}
