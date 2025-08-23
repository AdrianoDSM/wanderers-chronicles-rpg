import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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
    },
  });

  if (!campaign) {
    notFound();
  }

  return (
    <section style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        {campaign.name}
      </h2>
      <p style={{ marginBottom: "1rem" }}>
        <strong>Status:</strong> {campaign.status}
      </p>
      {campaign.description && (
        <p style={{ marginBottom: "1rem" }}>
          <strong>Descrição:</strong> {campaign.description}
        </p>
      )}
      <p style={{ fontSize: "0.9rem", color: "#888" }}>
        Criada em: {new Date(campaign.createdAt).toLocaleDateString("pt-BR")}
      </p>
    </section>
  );
}
