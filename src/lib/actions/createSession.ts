'use server'

import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { prisma } from "../prisma"

type SessionInput = {
    title: string
    description?: string
    duration: number
    sessionDate: Date
    campaignId: string
}

export async function createSession({title, description, duration, sessionDate, campaignId}: SessionInput) {
    const userSession = await getServerSession(authOptions)
    if (!userSession) {
        throw new Error('Usuário não encontrado')
    }
    const existing = await prisma.session.findFirst({ where: {sessionDate, title, campaignId} })
    if (existing) {
        throw new Error('Já existe uma sessão com esse título e data')
    }

    const session = await prisma.session.create({
        data: {
            title,
            description,
            duration,
            sessionDate,
            campaignId,
        }
    })
    return session
}
