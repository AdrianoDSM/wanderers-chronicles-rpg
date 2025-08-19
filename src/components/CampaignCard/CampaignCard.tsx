import styles from "./CampaignCard.module.css";
import { CampaignProps } from "@/types/models/Campaign";
import { CampaignStatus } from "@/types/enums/CampaignStatus";

interface CampaignCardProps {
  campaign: CampaignProps;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
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

  const handleClick = () => {
    if (isSelected) {
      onSelect(null);
    }
      else {
        onSelect(campaign.id);
      }
    }
  
  return (
    <div
      className={`${styles.campaignCard} ${isSelected ? styles.selected : ""}`}
      onClick={handleClick}
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
