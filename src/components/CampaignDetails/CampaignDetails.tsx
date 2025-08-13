"use client";

import { useCampaignStore } from "@/store/useCampaignStore";
import { useQuery } from "@tanstack/react-query";
import type { CampaignProps } from "@/types/models/Campaign";

export function CampaignDetails() {
  const { selectedCampaignId } = useCampaignStore();

  const { data: campaign, isLoading, isError } = useQuery<CampaignProps>({
    queryKey: ["campaign", selectedCampaignId],
    queryFn: async () => {
      if (!selectedCampaignId) return null;
      const res = await fetch(`/api/campaigns/${selectedCampaignId}`);
      if (!res.ok) throw new Error("Erro ao buscar campanha");
      return res.json();
    },
    enabled: !!selectedCampaignId,
  });

  if (!selectedCampaignId) return <p>Nenhuma campanha selecionada</p>;
  if (isLoading) return <p>Carregando detalhes...</p>;
  if (isError || !campaign) return <p>Erro ao carregar detalhes</p>;

  return (
    <div>
      <h2>{campaign.name}</h2>
      <p>{campaign.description || "Sem descrição"}</p>
      <p>Status: {campaign.status}</p>
      <p>Owner: {campaign.owner.name}</p>
      <p>Total de sessões: {campaign.sessions?.length || 0}</p>
      <p>Total de personagens: {campaign.characters?.length || 0}</p>
      <p>Total de notas: {campaign.notes?.length || 0}</p>
      <small>Criada em: {new Date(campaign.createdAt).toLocaleDateString("pt-BR")}</small>
    </div>
  );
}
