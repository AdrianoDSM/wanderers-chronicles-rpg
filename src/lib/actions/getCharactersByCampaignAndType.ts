"use server"

import type { CharacterType } from "@/types/enums/CharacterType";
import { prisma } from "../prisma";

export async function getCharactersByCampaignAndType(campaignId: string, type: CharacterType) {
  return prisma.character.findMany({
    where: {
      campaignId,
      type,
    },
    select: { id: true, name: true },
  });
}
