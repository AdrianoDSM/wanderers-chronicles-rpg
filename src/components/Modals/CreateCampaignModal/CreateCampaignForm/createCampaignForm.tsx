"use client";

import { createCampaign } from "@/lib/actions/createCampaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import styles from "./createCampaignForm.module.css";
import { rpgSystems } from "@/constants/rpgSystem";
import { useCampaignFormStore } from "@/store/useCampaignFormStore";
import { useCampaignPlayersStore } from "@/store/useCampaignPlayersStore";
import { useMutation } from "@tanstack/react-query";

export const createCampaignSchema = z.object({
  name: z.string().min(1, { message: "Nome obrigatório" }),
  description: z
    .string()
    .max(450, { message: "Máximo de 450 caracteres" })
    .optional(),
  system: z.string().min(2, { message: "Sistema obrigatório" }),
  players: z.array(z.string().min(1, { message: "Nome do jogador obrigatório"}))
  .min(1, { message: "É necessário pelo menos 1 jogador" })
  .max(10, { message: "Máximo de 10 jogadores permitidos" }),
});

type CreateCampaignInput = z.infer<typeof createCampaignSchema>;

export function CreateCampaignForm() {
  const {
    playerCount,
    playerNames,
    setPlayerCount,
    setPlayerName,
    resetPlayers,
  } = useCampaignPlayersStore()

  const {
    customSystem,
    setCustomSystem,
    resetCustomSystem,
  } = useCampaignFormStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateCampaignInput>({
    resolver: zodResolver(createCampaignSchema),
  });

  const router = useRouter();
  const selectedSystem = watch('system');
  const finalSystem = selectedSystem === "Outros" ? customSystem : selectedSystem;
  const description = watch("description") || "";

  const mutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: (campaign: { slug: string; }) => {
      toast.success("Campanha criada com sucesso!");
      resetCustomSystem();
      resetPlayers();
      router.push(`/campaigns/${campaign.slug}`)
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erro ao criar campanha")
    },
  });

  const onSubmit = (data: CreateCampaignInput) => {
    mutation.mutate({ 
      ...data, 
      system: finalSystem,
      players: playerNames,
    })
  };

  function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="name">
          Nome da Campanha
        </label>
        <input
          {...register("name")}
          id="name"
          className={styles.input}
          placeholder="Digite o nome da campanha"
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="description">
          Descrição (opcional)
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={4}
          maxLength={450}
          onInput={autoResize}
          placeholder="Fale brevemente sobre sua campanha"
          className={styles.textarea}
        />
        <div className={styles.charCount}>{description?.length || 0}/450</div>
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>
      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="system">Sistema</label>
        <select {...register("system")} id="system" className={styles.select}>
          <option value="">Selecione um sistema</option>
          {rpgSystems.map((system) => (
            <option key={system} value={system}>
              {system}
            </option>
          ))}
        </select>
        {errors.system && <p className={styles.error}>{errors.system.message}</p>}
      </div>
      {selectedSystem === "Outros" && (
        <div className={styles.formItem}>
          <label className={styles.label} htmlFor="customSystem">Nome do Sistema</label>
          <input
            id="customSystem"
            value={customSystem}
            onChange={(e) => setCustomSystem(e.target.value)}
            className={styles.input}
            placeholder="Digite o nome do sistema"
            required
          />
        </div>
      )}
      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="playerCount">Número de Jogadores</label>
        <input
          id="playerCount"
          type="number"
          min={1}
          max={10}
          value={playerCount || ""}
          onChange={(e) => {
            const raw = Number(e.target.value);
            const safe = Math.min(Math.max(raw, 1), 10)
            setPlayerCount(safe);
          }}
          onWheel={(e) => e.currentTarget.blur()}
          className={styles.input}
          required
        />
      </div>

      {playerNames.map((name, index) => (
        <div key={index} className={styles.formItem}>
          <label className={styles.label}>Jogador {index + 1}</label>
          <input
            value={name}
            onChange={(e) => setPlayerName(index, e.target.value)}
            className={styles.input}
            placeholder={`Nome do jogador ${index + 1}`}
            required
          />
          {errors.players?.[index] && (
            <p className={styles.error}>{errors.players[index]?.message}</p>
          )}
        </div>
      ))}
      <button type="submit" disabled={mutation.isPending} className={styles.button}>
        {mutation.isPending ? "Criando..." : "Criar Campanha"}
      </button>
    </form>
  );
}
