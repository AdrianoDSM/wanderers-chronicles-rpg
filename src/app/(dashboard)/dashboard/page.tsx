import { CampaignDetails } from "@/components/DashboardPage/CampaignDetails/CampaignDetails";
import styles from "./dashboard.module.css";
import { DashboardHeader } from "@/components/DashboardPage/DashboardHeader/dashboardHeader";
import { CampaignList } from "@/components/DashboardPage/CampaignList/CampaignList";

export default function DashboardPage() {
  return (
    <div className={styles.mainContainer}>
      <DashboardHeader />
      <CampaignList />
      <CampaignDetails />
    </div>
  );
}
