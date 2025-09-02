"use server"

import { prisma } from "../prisma";

export async function getSessionsByCampaign(campaignId: string) {
  return prisma.session.findMany({
    where: { campaignId },
    select: { id: true, title: true },
  });
}
