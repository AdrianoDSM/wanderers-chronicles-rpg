"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../prisma";
import type { CharacterType } from "@/types/enums/CharacterType";
import type { CharacterStatus } from "@/types/enums/CharacterStatus";

type CharacterInput = {
  name: string;
  race?: string;
  class?: string;
  level?: number;
  description?: string;
  type: CharacterType;
  status?: CharacterStatus;
  imageUrl: string;
  campaignId: string;
  playerId?: string;
};

export async function createCharacter(data: CharacterInput) {
  const userSession = await getServerSession(authOptions);
  if (!userSession) {
    throw new Error("Usuário não encontrado");
  }
  
  const normalizedName = data.name.trim().toLowerCase();
  const existing = await prisma.character.findFirst({
    where: {
      name: normalizedName,
      campaignId: data.campaignId,
    },
  });

  if (existing) {
    throw new Error("Já existe um personagem com esse nome na campanha");
  }

  if (data.type === "PC") {
    if (!data.playerId) {
      throw new Error(
        "Personagem jogador precisa estar vinculado a um jogador"
      );
    }

    const alreadyLinked = await prisma.character.findUnique({
      where: { playerId: data.playerId },
    });

    if (alreadyLinked) {
      throw new Error("Este jogador já possui um personagem vinculado");
    }
  }

  const character = await prisma.character.create({
    data: {
      name: data.name,
      race: data.race,
      class: data.class,
      level: data.level,
      description: data.description,
      type: data.type,
      status: data.status ?? "ALIVE",
      imageUrl: data.imageUrl,
      campaignId: data.campaignId,
      playerId: data.type === "PC" ? data.playerId ?? null : null,
    },
  });
  return character;
}
