import type { CampaignStatus, Character, Note, Session } from '@/generated/prisma';
import styles from './CampaignGrid.module.css';
import CampaignSummary from '../CampaignSummary/CampaignSummary';
import CampaignActivity from '../CampaignActivity/CampaignActivity';
import CampaignQuickActions from '../CampaignQuickActions/CampaignQuickActions';

type CampaignProps = {
  name: string;
  slug: string;
  description: string | null;
  status: CampaignStatus;
  characters: Character[];
  sessions: Session[];
  notes: Note[];
}

export default function CampaignGrid({campaign}: {campaign: CampaignProps}) {
  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.summary}><CampaignSummary campaign={campaign}/></div>
      <div className={styles.activity}><CampaignActivity/></div>
      <div className={styles.quickActions}><CampaignQuickActions/></div>
      <div className={styles.characters}>Personagens</div>
      <div className={styles.stats}>Estatísticas da Campanha</div>
      <div className={styles.ideas}>Notas / Inspiração</div>
    </div>
  );
}
