"use client";

import { CampaignDetails } from "@/components/CampaignDetails/CampaignDetails";
import { CampaignList } from "@/components/CampaignList/CampaignList";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Usuário";
  return (
    <div>
      <h1>Dashboard de Campanhas - {userName}</h1>
      <CampaignList />
      <CampaignDetails />
    </div>
  );
}
