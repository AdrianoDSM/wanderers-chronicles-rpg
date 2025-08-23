'use server'

import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { prisma } from "../prisma"
import { generateSlug } from "../utils/slugify"

type CampaignInput = {
    name: string
    description?: string
}

export async function createCampaign({name, description}: CampaignInput) {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new Error('Usuário não encontrado')
    }
    const slug = generateSlug(name)
    const existing = await prisma.campaign.findUnique({ where: {slug} })
    if (existing) {
        throw new Error('Já existe campanha com esse nome')
    }

    const campaign = await prisma.campaign.create({
        data: {
            name,
            description,
            slug,
            ownerId: session.user.id,
        }
    })
    return campaign
}
