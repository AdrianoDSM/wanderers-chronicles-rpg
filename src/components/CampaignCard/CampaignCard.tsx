// import styles from "./CampaignCard.module.css";
import { CampaignProps } from "@/types/models/Campaign";
import { CampaignStatus } from "@/types/enums/CampaignStatus";

interface CampaignCardProps {
  campaign: CampaignProps;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function CampaignCard({
  campaign,
  isSelected,
  onSelect,
}: CampaignCardProps) {
  const statusLabel = (() => {
    switch (campaign.status) {
      case CampaignStatus.ACTIVE:
        return "Active";
      case CampaignStatus.PAUSED:
        return "Paused";
      case CampaignStatus.FINISHED:
        return "Finished";
      default:
        return "";
    }
  })();
  return (
    <div
      className={`campaign-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(campaign.id)}
    >
      <h2>{campaign.name}</h2>
      <p>{campaign.description || "Sem descrição"}</p>
      <p>Status: {statusLabel}</p>
      <p>Sessões: {campaign.sessions?.length || 0}</p>
      <small>
        Criada em: {new Date(campaign.createdAt).toLocaleDateString("pt-BR")}
      </small>
    </div>
  );
}
