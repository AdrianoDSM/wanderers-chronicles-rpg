import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SessionProviderWrapper } from "../../providers/SessionProviderWrapper";
import { DashboardAside } from "@/components/DashboardAside/dashboardAside";
import { DashboardHeader } from "@/components/DashboardHeader/dashboardHeader";
import { CreateCampaignModal } from "@/components/CreateCampaignModal/createCampaignModal";
import "./dashboard.css";
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProviderWrapper session={session}>
      <div className="dashboard-wrapper">
        <DashboardAside />
        <div className="dashboard-content">
          <DashboardHeader />
          <main>{children}</main>
        </div>
        <CreateCampaignModal />
      </div>
    </SessionProviderWrapper>
  );
}
