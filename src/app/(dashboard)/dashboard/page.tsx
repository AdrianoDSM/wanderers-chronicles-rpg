"use client";

import { CampaignDetails } from "@/components/CampaignDetails/CampaignDetails";
import { CampaignList } from "@/components/CampaignList/CampaignList";
import styles from './dashboard.module.css'

export default function DashboardPage() {
  return (
    <div  className={styles.mainContainer}>
      <CampaignList />
      <CampaignDetails />
    </div>
  );
}
