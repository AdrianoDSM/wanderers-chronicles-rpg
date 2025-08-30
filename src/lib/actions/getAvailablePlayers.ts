'use server'

import { prisma } from "../prisma";


export async function getAvailablePlayers(campaignId: string) {
  return prisma.player.findMany({
    where: {
      campaignId,
      character: {
        is: null,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
}
