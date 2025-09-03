import { CampaignStatus, Character, Note, Session, Player } from "@/generated/prisma";
import styles from "./CampaignGrid.module.css";
import CampaignSummary from "./CampaignSummary/CampaignSummary";
import CampaignActivity from "./CampaignActivity/CampaignActivity";
import CampaignQuickActions from "./CampaignQuickActions/CampaignQuickActions";
import CampaignCharacters from "./CampaignCharacters/CampaignCharacters";
import CampaignStats from "./CampaignStats/CampaignStats";

type CampaignProps = {
  name: string;
  slug: string;
  system: string;
  description: string | null;
  status: CampaignStatus;
  characters: Character[];
  sessions: Session[];
  notes: Note[];
  players: Player[];
};

export default function CampaignGrid({
  campaign,
}: {
  campaign: CampaignProps;
}) {
  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.summary}>
        <CampaignSummary campaign={campaign} />
      </div>
      <div className={styles.activity}>
        <CampaignActivity />
      </div>
      <div className={styles.quickActions}>
        <CampaignQuickActions />
      </div>
      <div className={styles.characters}>
        <CampaignCharacters />
      </div>
      <div className={styles.stats}>
        <CampaignStats />
      </div>
    </div>
  );
}
