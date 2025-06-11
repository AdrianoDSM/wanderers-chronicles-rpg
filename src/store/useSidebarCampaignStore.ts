import { create } from "zustand"

type SidebarCampaignMenuStore = {
    isCampaignMenuOpen: boolean
    toggleCampaignMenu: ()=> void
    openCampaignMenu: ()=> void
    closeCampaignMenu: ()=> void
}

export const useSidebarCampaignMenuStore = create<SidebarCampaignMenuStore>((set)=> ({
    isCampaignMenuOpen: false,
    toggleCampaignMenu: ()=>
        set((state)=>({isCampaignMenuOpen: !state.isCampaignMenuOpen})),
    openCampaignMenu: ()=> set({isCampaignMenuOpen: true}),
    closeCampaignMenu: ()=> set({isCampaignMenuOpen: false})
}))