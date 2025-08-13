"use client";

import { createCampaign } from "@/lib/actions/createCampaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import styles from "./createCampaignForm.module.css";

export const createCampaignSchema = z.object({
  name: z.string().min(1, { message: "Nome obrigatório" }),
  description: z.string().max(450, { message: "Máximo de 450 caracteres" }).optional(),
});

type CreateCampaignInput = z.infer<typeof createCampaignSchema>;

export function CreateCampaignForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateCampaignInput>({
    resolver: zodResolver(createCampaignSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: CreateCampaignInput) => {
    try {
      const campaign = await createCampaign(data);
      toast.success("Campanha criada com sucesso!");
      router.push(`/campaign/${campaign.name}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao criar campanha");
      }
    }
  };

  function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const description = watch("description") || ""

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formItem}>
            <label className={styles.label} htmlFor="name">Nome da Campanha</label>
            <input
              {...register("name")}
              id="name"
              className={styles.input}
              placeholder="Digite o nome da campanha"
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </div>

          <div className={styles.formItem}>
            <label className={styles.label} htmlFor="description">Descrição (opcional)</label>
            <textarea
              {...register("description")}
              id="description"
              rows={4}
              maxLength={450}
              onInput={autoResize}
              placeholder="Fale brevemente sobre sua campanha"
              className={styles.textarea}
            />
            <div className={styles.charCount}>
              {description?.length || 0}/450
            </div>
            {errors.description && <p className={styles.error}>{errors.description.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.button}>
            Criar Campanha
          </button>
        </form>
  );
}
