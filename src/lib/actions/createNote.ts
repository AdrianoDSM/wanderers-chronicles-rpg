"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../prisma";
import type { NoteType } from "@/types/enums/NoteType";

type NoteInput = {
  title?: string;
  content: string;
  type: NoteType;
  campaignId: string;
  characterId?: string | null;
  sessionId?: string | null;
};

export async function createNote(data: NoteInput) {
  const userSession = await getServerSession(authOptions);
  if (!userSession) {
    throw new Error("Usuário não autenticado");
  }

  const trimmedContent = data.content.trim();
  if (trimmedContent.length === 0) {
    throw new Error("Conteúdo da nota não pode estar vazio");
  }

  if (data.title && data.title.trim().length === 0) {
    throw new Error("Título da nota não pode estar vazio");
  }

  const noteType = data.type ?? "PLANNING";

  if(noteType === "NPC" && !data.characterId) {
    throw new Error("Notas do tipo NPC precisam estar vinculadas a um personagem")
  }

  const note = await prisma.note.create({
    data: {
      title: data.title?.trim() || null,
      content: trimmedContent,
      type: noteType,
      campaignId: data.campaignId,
      characterId: noteType === "NPC" ? data.characterId! : null,
      sessionId: data.sessionId ?? null,
    },
  });

  return note;
}
