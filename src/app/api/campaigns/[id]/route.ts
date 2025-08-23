import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const campaign = await prisma.campaign.findFirst({
    where: { id: params.id, ownerId: session.user.id },
    include: {
      owner: true,
      notes: true,
      sessions: true,
      characters: true,
    },
  });

  if (!campaign) {
    return NextResponse.json({ error: "Campanha não encontrada" }, { status: 404 });
  }

  return NextResponse.json(campaign);
}
