import { CampaignDetails } from "@/components/CampaignDetails/CampaignDetails";
import { CampaignList } from "@/components/CampaignList/CampaignList";
import styles from "./dashboard.module.css";
import { DashboardHeader } from "@/components/DashboardHeader/dashboardHeader";

export default function DashboardPage() {
  return (
    <div className={styles.mainContainer}>
      <DashboardHeader />
      <CampaignList />
      <CampaignDetails />
    </div>
  );
}
