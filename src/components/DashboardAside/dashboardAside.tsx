import Image from "next/image";
import styles from "./dashboardAside.module.css";
import { SidebarCampaignMenu } from "../SidebarCampaignMenu/sidebarCampaignMenu";
import { UserInfo } from "../SidebarUserInfo/sidebarUserInfo";
import { getUserCampaigns } from "@/lib/queries/getUserCampaigns";

export async function DashboardAside () {
  const campaigns = await getUserCampaigns()

  return (
    <aside className={styles.aside}>
      <div className={styles.titleBox}>
        <Image
          src="/logo.png"
          alt="logo da Wanderers Chronicles"
          width={70}
          height={70}
        />
        <div>
          <h3 className={styles.title}>Wanderers Chronicles</h3>
          <p className={styles.subtitle}>Your Chronicles</p>
        </div>
      </div>
      <UserInfo />
      <div>
        <SidebarCampaignMenu campaigns={campaigns} />
      </div>
      <div></div>
    </aside>
  );
};
