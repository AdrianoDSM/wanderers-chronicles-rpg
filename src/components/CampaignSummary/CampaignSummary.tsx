import type { Character, Note, Session } from "@/generated/prisma";
import { CampaignStatus } from "@/generated/prisma";
import styles from "./CampaignSummary.module.css";

type CampaignProps = {
  name: string;
  slug: string;
  description: string | null;
  status: CampaignStatus;
  characters: Character[];
  sessions: Session[];
  notes: Note[];
}

export default function CampaignSummary({campaign}: {campaign: CampaignProps}) {

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
    <div className={styles.summaryContainer}>
      <div className={styles.summaryContent}>
        <div className={styles.titleDiv}>
          <p className={styles.title}>{campaign.name}</p>
          <span className={styles.status}>{statusLabel}</span>
        </div>
        <div className={styles.infos}>
          <div className={styles.info}>Sistema: <strong></strong></div>
          <div className={styles.info}>Nível: <strong></strong></div>
          <div className={styles.info}>Jogadores: <strong></strong></div>
          <div className={styles.info}>Sessões: <strong></strong></div>
        </div>
        <div className={styles.session}>
            <div className={styles.lastSession}>
                <span>Última sessão:</span>
                <strong>1</strong>
            </div>
            <div className={styles.nextSession}>
                <span>Próxima sessão:</span>
                <strong>2</strong>
            </div>
        </div>
      </div>
      <div className={styles.description}>
        <span>Descrição da Campanha: </span>
        <p>{campaign.description || "Sem Descrição..."}</p>
      </div>
    </div>
  );
}
