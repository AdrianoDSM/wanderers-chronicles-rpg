import Image from "next/image";
import styles from "./dashboardAside.module.css";
import { SidebarCampaignMenu } from "../SidebarCampaignMenu/sidebarCampaignMenu";
import { UserInfo } from "../SidebarUserInfo/sidebarUserInfo";
import { Settings } from "lucide-react";
import { LogoutButton } from "../LogoutButton/logoutButton";
import type { Campaign } from "@/generated/prisma";

export function DashboardAside ({campaigns}: {campaigns: Campaign[]}) {

  return (
    <>
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
        <SidebarCampaignMenu campaigns={campaigns} />
      <div className={styles.footer}>
        <button className={styles.footerButton}>
        <Settings/>
        Configurações
        </button>
        <LogoutButton className={styles.footerButton}/>
      </div>
    </>
  );
};
