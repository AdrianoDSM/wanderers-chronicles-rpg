'use server'

import { prisma } from "../prisma";

export async function getCampaignIdBySlug(slug: string): Promise<string> {
  const campaign = await prisma.campaign.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!campaign) {
    throw new Error("Campanha não encontrada");
  }

  return campaign.id;
}