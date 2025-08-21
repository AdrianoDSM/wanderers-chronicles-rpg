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
        return "Ativo";
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
      <div className={styles.headline}>
      <div className={styles.titleDiv}>
      <h2>{campaign.name}</h2>
      <p>{statusLabel}</p>
      </div>
      <div className={styles.subtitleDiv}>
      <p>{campaign.sessions?.length || 0} Sessões</p>
      <p>{campaign.characters?.length || 0} Personagens</p>
      </div>
      </div>
      <small className={styles.createdAt}>
        Criada em: {new Date(campaign.createdAt).toLocaleDateString("pt-BR")}
      </small>
    </div>
  );
}
