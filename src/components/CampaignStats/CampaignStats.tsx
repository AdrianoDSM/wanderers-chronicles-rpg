import { BookOpen, Hourglass, ScrollText, Timer, User, Users } from 'lucide-react'
import styles from './CampaignStats.module.css'

export default function CampaignStats() {
    return (
        <div className={styles.statsContainer}>
      <p className={styles.title}>Estatísticas da Campanha</p>
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
            <BookOpen size={30}/>
            </div>
            <div className={styles.cardText}>
              <p>Número</p>
              <span>Sessões</span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
            <Timer size={30}/>
            </div>
            <div className={styles.cardText}>
              <p>Número</p>
              <span>Horas Jogadas</span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
            <Hourglass size={30}/>
            </div>
            <div className={styles.cardText}>
              <p>Número</p>
              <span>Tempo Médio por Sessão</span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
            <ScrollText size={30}/>
            </div>
            <div className={styles.cardText}>
              <p>Número</p>
              <span>Notas Registradas</span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
            <User size={30}/>
            </div>
            <div className={styles.cardText}>
              <p>Número</p>
              <span>PCs na Campanha</span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardIcon}>
            <Users size={30}/>
            </div>
            <div className={styles.cardText}>
              <p>Número</p>
              <span>NPCs Registrados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}