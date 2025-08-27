import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import styles from "./CampaignCharacters.module.css";
import Link from "next/link";

export default function CampaignCharacters() {
  return (
    <div className={styles.charactersContainer}>
      <div className={styles.header}>
        <p className={styles.title}>Personagens</p>
        <div className={styles.navTabs}>
          <button type="button" className={styles.tab}>
            PC
          </button>
          <button type="button" className={styles.tab}>
            NPC
          </button>
        </div>
      </div>
      <div className={styles.charactersContent}>
        <div className={styles.contentHeader}>
          <span>Número Personagens</span>
          <div className={styles.characterPages}>
            <button type="button">
              <ArrowLeft />
            </button>
            PáginaAtual/TotalPágina
            <button type="button">
              <ArrowRight />
            </button>
          </div>
        </div>
        <div className={styles.charactersWrapper}>
          <div className={styles.card}>
            <div className={styles.characterContainer}>
              <div className={styles.characterStats}>
                <UserRound size={150} />
                <p className={styles.characterName}>Bernum Evermount</p>
                <div className={styles.characterMainStats}>
                  <span className={styles.mainStat}>Raça</span>
                  <span className={styles.mainStat}>Classe</span>
                  <span className={styles.mainStat}>Level</span>
                </div>
              </div>
            </div>
            <Link className={styles.characterDetails} href={"#"}>
              Ver Detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
