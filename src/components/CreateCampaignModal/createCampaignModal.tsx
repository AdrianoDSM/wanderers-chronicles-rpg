"use client"

import { useCreateCampaignStore } from "@/store/useCreateCampaignStore"
import styles from './createCampaignModal.module.css'
import { X } from "lucide-react"

export function CreateCampaignModal() {
    const isOpen = useCreateCampaignStore(s => s.isOpen)
    const close = useCreateCampaignStore(s => s.close)

    if(!isOpen) return null

    return (
        <div className={styles.overlay} onClick={close}>
            <div className={styles.modal} onClick={e => e.stopPropagation()} tabIndex={-1}>
                <button className={styles.closeButton} onClick={close}>
                    <X size={20} />
                </button>
                <h2 className={styles.title}>Comece agora a documentar uma das suas épicas crônicas</h2>
                <form className={styles.form}>
                    <input 
                        type="text"
                        name="campaignName" 
                        placeholder="Nome da campanha" 
                        required 
                    />
                    <textarea 
                        name="description" 
                        placeholder="Descrição da campanha" 
                        rows={5} 
                    />
                    <button type="submit">Criar Campanha</button>
                </form>
            </div>
        </div>
    )
}