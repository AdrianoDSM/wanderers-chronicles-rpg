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

export const createCampaignSchema = z.object({
  name: z.string().min(1, { message: "Nome obrigatório" }),
  description: z
    .string()
    .max(450, { message: "Máximo de 450 caracteres" })
    .optional(),
  system: z.string().min(2, { message: "Sistema obrigatório" }),
});

type CreateCampaignInput = z.infer<typeof createCampaignSchema>;

export function CreateCampaignForm() {
  const {
    customSystem,
    setCustomSystem,
    resetCustomSystem,
  } = useCampaignFormStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateCampaignInput>({
    resolver: zodResolver(createCampaignSchema),
  });

  const router = useRouter();
  const selectedSystem = watch('system');
  const finalSystem = selectedSystem === "Outros" ? customSystem : selectedSystem;

  const onSubmit = async (data: CreateCampaignInput) => {
    try {
      const campaign = await createCampaign({
        ...data,
        system: finalSystem,
      });
      toast.success("Campanha criada com sucesso!");
      resetCustomSystem();
      router.push(`/campaigns/${campaign.slug}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao criar campanha");
      }
    }
  };

  function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const description = watch("description") || "";

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

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        Criar Campanha
      </button>
    </form>
  );
}
