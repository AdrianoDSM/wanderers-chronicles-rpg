"use client";

import { useCreateCampaignStore } from "@/store/useCreateCampaignStore";
import { useSidebarCampaignMenuStore } from "@/store/useSidebarCampaignStore";
import Link from "next/link";
import { ArrowDown, Plus } from "lucide-react";
import styles from "./sidebarCampaignMenu.module.css";

type Campaign = {
  id: string;
  name: string;
  slug: string;
};

export function SidebarCampaignMenu({ campaigns }: { campaigns: Campaign[] }) {
  const openCreateCampaignModal = useCreateCampaignStore((state) => state.open);
  const isOpen = useSidebarCampaignMenuStore(
    (state) => state.isCampaignMenuOpen
  );
  const toggleMenu = useSidebarCampaignMenuStore(
    (state) => state.toggleCampaignMenu
  );

  return (
    <div className={styles.campaignMenuWrapper}>
      <Link href="/dashboard" className={styles.dashboardButton}>
        Dashboard
      </Link>
      <div className={styles.campaignSection}>
        <div className={styles.dropdownHeader}>
          <button className={styles.dropdownButton} onClick={toggleMenu}>
            <ArrowDown
              className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
              size={20}
            />
            Minhas Campanhas
            <span
              role="button"
              aria-label="Nova Campanha"
              className={styles.plusButton}
              onClick={(e) => {
                e.stopPropagation();
                openCreateCampaignModal();
              }}
            >
              <Plus size={20} />
            </span>
          </button>
        </div>
        <ul
          className={`${styles.dropdownCampaign} ${isOpen ? styles.open : ""}`}
        >
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <>
                <li key={campaign.id}>
                  <div className={styles.campaignButtonContainer}>
                  <Link
                    href={`/campaigns/${campaign.slug}`}
                    className={styles.campaignButton}
                  >
                    {campaign.name}
                  </Link>
                  </div>
                </li>
              </>
            ))
          ) : (
            <li className={styles.emptyCampaign}>
              <button
                type="button"
                onClick={openCreateCampaignModal}
                className={styles.createCampaignButton}
              >
                Crie sua Campanha
                <Plus size={20} />
              </button>
            </li>
          )}
        </ul>
        <div className={styles.emptyCampaign}></div>
      </div>
    </div>
  );
}
