import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Shell } from "../../providers/Shell";
import { DashboardHeader } from "@/components/DashboardHeader/dashboardHeader";
import { CreateCampaignModal } from "@/components/CreateCampaignModal/createCampaignModal";
import styles from './dashboard.module.css';
import { AsideWrapper } from "@/components/AsideWrapper/AsideWrapper";
import { getUserCampaigns } from "@/lib/queries/getUserCampaigns";
import { CollapseAsideButtonWrapper } from "@/components/CollapseAsideButton/CollapseAsideButtonWrapper";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const campaigns = await getUserCampaigns()

  if (!session) {
    redirect("/login");
  }

  return (
    <Shell session={session}>
      <div className={styles.dashboardWrapper}>
        <AsideWrapper campaigns={campaigns} />
        <div className={styles.dashboardContent}>
          <CollapseAsideButtonWrapper/>
          <DashboardHeader />
          <main className={styles.mainWrapper}>{children}</main>
        </div>
        <CreateCampaignModal />
      </div>
    </Shell>
  );
}
