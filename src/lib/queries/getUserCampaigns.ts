import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../prisma";

export async function getUserCampaigns() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const campaigns = await prisma.campaign.findMany({
    where: { ownerId: session.user.id },
    select: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      description: true,
      status: true,
      ownerId: true,
    },
  });

  return campaigns;
}
