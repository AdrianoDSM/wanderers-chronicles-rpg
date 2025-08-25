import { authOptions } from "@/lib/authOptions";
import { Shell } from "@/app/providers/Shell";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./campaign.module.css";
import { CampaignPageHeader } from "@/components/CampaignPageHeader/CampaignPageHeader";
import { CreateCampaignModal } from "@/components/CreateCampaignModal/createCampaignModal";
import { prisma } from "@/lib/prisma";

export default async function CampaignsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { slug: params.slug },
    select: {
      name: true,
      status: true,
      slug: true,
    },
  });

  if (!campaign) return notFound();

  return (
    <Shell session={session}>
      <div className={styles.campaignWrapper}>
        <CampaignPageHeader
          name={campaign.name}
          status={campaign.status}
          slug={campaign.slug}
        />
        <div className={styles.campaignContent}>{children}</div>
        <CreateCampaignModal />
      </div>
    </Shell>
  );
}
