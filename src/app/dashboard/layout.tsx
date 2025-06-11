import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SessionProviderWrapper } from "../providers/SessionProviderWrapper";
import { DashboardAside } from "@/components/DashboardAside/dashboardAside";
import { DashboardHeader } from "@/components/DashboardHeader/dashboardHeader";

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
      <div>
        <DashboardAside />
        <div>
          <DashboardHeader />
          <main>{children}</main>
        </div>
      </div>
    </SessionProviderWrapper>
  );
}
