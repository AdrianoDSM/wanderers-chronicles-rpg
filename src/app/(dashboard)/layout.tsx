import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { Shell } from "../providers/Shell";
import { CreateCampaignModal } from "@/components/Modals/CreateCampaignModal/createCampaignModal";
import styles from "./dashboard/dashboard.module.css";
import { AsideWrapper } from "@/components/AsideWrapper/AsideWrapper";
import { getUserCampaigns } from "@/lib/queries/getUserCampaigns";
import { CollapseAsideButtonWrapper } from "@/components/CollapseAsideButton/CollapseAsideButtonWrapper";
import { CreateSessionModal } from "@/components/Modals/CreateSessionModal/CreateSessionModal";
import { CreateCharacterModal } from "@/components/Modals/CreateCharacterModal/CreateCharacterModal";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const campaigns = await getUserCampaigns();

  if (!session) {
    redirect("/login");
  }

  return (
    <Shell session={session}>
      <div className={styles.dashboardWrapper}>
        <AsideWrapper campaigns={campaigns} />
        <div className={styles.dashboardContent}>
          <CollapseAsideButtonWrapper />
          <main className={styles.mainWrapper}>{children}</main>
        </div>
        
        <CreateCampaignModal />
        <CreateSessionModal />
        <CreateCharacterModal />
      </div>
    </Shell>
  );
}
