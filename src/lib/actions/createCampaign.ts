'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { prisma } from "../prisma"

type CampaignInput = {
    name: string
    description?: string
}

export async function createCampaign({name, description}: CampaignInput) {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new Error('Usuário não encontrado')
    }
    const campaign = await prisma.campaign.create({
        data: {
            name,
            description,
            ownerId: session.user.id,
        }
    })
    return campaign
}
