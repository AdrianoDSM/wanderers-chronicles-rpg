'use client'

import { useCreateCampaignStore } from "@/store/useCreateCampaignStore";
import { useSidebarCampaignMenuStore } from "@/store/useSidebarCampaignStore";
import Link from "next/link";
import { Plus } from "lucide-react";
import styles from "./sidebarCampaignMenu.module.css";

type Campaign = {
  id: string;
  name: string;
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
      <Link href="/dashboard" className={styles.campaignMenuOption}>
        Dashboard
      </Link>
      <div className={styles.campaignSection}>
        <div className={styles.dropdownHeader}>
          <button className={styles.campaignMenuOption} onClick={toggleMenu}>
            Minhas Campanhas
          </button>
          <button
            type="button"
            aria-label="Nova Campanha"
            className={styles.plusButton}
            onClick={openCreateCampaignModal}
          >
            <Plus size={16} />
          </button>
        </div>
        {isOpen && (
          <ul className={styles.dropdownCampaign}>
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <li key={campaign.id}>
                  <Link
                    href={`/campaign/${campaign.id}`}
                    className={styles.campaignButton}
                  >
                    {campaign.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className={styles.emptyCampaign}>
                Nenhuma campanha criada. {" "}
                <button
                    onClick={openCreateCampaignModal}
                    className={styles.createFirstCampaign}
                >
                    Criar agora
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
