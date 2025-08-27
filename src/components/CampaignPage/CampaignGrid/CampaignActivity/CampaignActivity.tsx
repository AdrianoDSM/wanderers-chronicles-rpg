import { Clock, Library } from "lucide-react";
import styles from "./CampaignActivity.module.css";

export default function CampaignActivity() {
  return (
    <div className={styles.activityContainer}>
        <p className={styles.activityTitle}>Atividade Recente</p>
      <div className={styles.lastsSessionsDiv}>
        <p className={styles.lastsSessionsTitle}>Últimas Sessões</p>
        <div className={styles.sessionCardWrapper}>
        <div className={styles.sessionCard}>
          <div className={styles.sessionHeader}>
            <p className={styles.titleSession}>Título da Sessão</p>
            <span className={styles.dateSession}>25/12/2025</span>
          </div>
          <div className={styles.descriptionDiv}>
            <p className={styles.description}>Descrição</p>
          </div>
          <div className={styles.durationDiv}>
            <span className={styles.duration}><Clock />4h</span>
          </div>
        </div>
        <div className={styles.sessionCard}>
          <div className={styles.sessionHeader}>
            <p className={styles.titleSession}>Título da Sessão</p>
            <span className={styles.dateSession}>25/12/2025</span>
          </div>
          <div className={styles.descriptionDiv}>
            <p className={styles.description}>Descrição</p>
          </div>
          <div className={styles.durationDiv}>
            <span className={styles.duration}><Clock /> 4h</span>
          </div>
        </div>
        <div className={styles.sessionCard}>
          <div className={styles.sessionHeader}>
            <p className={styles.titleSession}>Título da Sessão</p>
            <span className={styles.dateSession}>25/12/2025</span>
          </div>
          <div className={styles.descriptionDiv}>
            <p className={styles.description}>Descrição</p>
          </div>
          <div className={styles.durationDiv}>
            <span className={styles.duration}><Clock /> 4h</span>
          </div>
        </div>
        </div>
      </div>
      <div className={styles.recentNotesDiv}>
        <p className={styles.recentNotesTitle}>Anotações Recentes</p>
        <div className={styles.recentNotesCardsWrapper}>
        <div className={styles.recentNotesCard}>
          <div className={styles.notesHeader}>
            <div className={styles.typeNotesDiv}>
            <Library/>
            <p className={styles.typeNotes}>Lore</p>
            </div>
            <span className={styles.dateNotes}>25/12/2025</span>
          </div>
          <div className={styles.descriptionDiv}>
            <p className={styles.description}>Descrição</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
