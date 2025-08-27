import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
// import styles from './campaign.module.css'
import CampaignGrid from "@/components/CampaignPage/CampaignGrid/CampaignGrid";

interface Props {
  params: { slug: string };
}

export default async function CampaignsPage({ params }: Props) {
  if (!params.slug) {
    return notFound();
  }

  const campaign = await prisma.campaign.findUnique({
    where: { slug: params.slug },
    select: {
      name: true,
      description: true,
      status: true,
      createdAt: true,
      slug: true,
      characters: true,
      notes: true,
      sessions: true,
    },
  });

  if (!campaign) {
    notFound();
  }

  return <CampaignGrid campaign={campaign} />;
}
