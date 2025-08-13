"use client"

import { CampaignDetails } from "@/components/CampaignDetails/CampaignDetails"
import { CampaignList } from "@/components/CampaignList/CampaignList"

export default function DashboardPage(){
    return (
        <div>
            <h1>Dashboard de Campanhas</h1>
            <CampaignList/>
            <CampaignDetails/>
        </div>
    )
}