import type { Character, Note, Player, Session } from "@/generated/prisma";
import { CampaignStatus } from "@/generated/prisma";
import styles from "./CampaignSummary.module.css";

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

export default function CampaignSummary({
  campaign,
}: {
  campaign: CampaignProps;
}) {
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

  const ultimaSessao = campaign.sessions
  .slice()
  .sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime())[0];

  const dataUltimaSessao = ultimaSessao
  ? new Date(ultimaSessao.sessionDate).toLocaleDateString("pt-BR")
  : "Nenhuma sessão registrada";
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryContent}>
        <div className={styles.titleDiv}>
          <p className={styles.title}>{campaign.name}</p>
          <span className={styles.status}>{statusLabel}</span>
        </div>
        <div className={styles.infos}>
          <div className={styles.info}>
            Sistema: 
            <strong>{campaign.system}</strong>
          </div>
          <div className={styles.info}>
            Nível: <strong></strong>
          </div>
          <div className={styles.info}>
            Jogadores: 
            <strong>{campaign.players.length}</strong>
          </div>
          <div className={styles.info}>
            Sessões: {campaign.sessions.length}
            <strong></strong>
          </div>
        </div>
        <div className={styles.session}>
          <div className={styles.lastSession}>
            <span>Última sessão:</span>
            <strong>{dataUltimaSessao}</strong>
          </div>
          <div className={styles.nextSession}>
            <span>Próxima sessão:</span>
            <strong>25/12/2025</strong>
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
