"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import styles from "./CreateSessionForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createSession } from "@/lib/actions/createSession";
import { getCampaignIdBySlug } from "@/lib/actions/getCampaignIdBySlug";

export const createSessionSchema = z.object({
  title: z.string().min(1, { message: "Título obrigatório" }),
  sessionDate: z.coerce.date({ message: "Data inválida" }),
  duration: z
    .number({ invalid_type_error: "Duração deve ser um número" })
    .min(1, { message: "Duração mínima de 5 minuto" }),
  description: z
    .string()
    .max(450, { message: "Máximo de 450 caracteres" })
    .optional(),
});

type CreateSessionInput = z.infer<typeof createSessionSchema>;

export function CreateSessionForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const router = useRouter();
  const params = useParams();
  const slug = typeof params.slug === "string"
    ?   params.slug
    :   Array.isArray(params.slug)
        ?   params.slug[0]
        : '';

  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      toast.success("Sessão criada com sucesso!");
      router.push(`/campaigns/${slug}/notes`);
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar campanha"
      );
    },
  });

  const onSubmit = async (data: CreateSessionInput) => {
    try{
        const campaignId = await getCampaignIdBySlug(slug as string)
        mutation.mutate({ ...data, campaignId});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        toast.error("Erro ao localizar campanha")
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
        <label className={styles.label} htmlFor="title">
          Nome da Sessão
        </label>
        <input
          {...register("title")}
          id="title"
          className={styles.input}
          placeholder="Digite o nome da sessão"
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
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
          placeholder="Fale brevemente sobre sua sessão"
          className={styles.textarea}
        />
        <div className={styles.charCount}>{description?.length || 0}/450</div>
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>
      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="sessionDate">
          Data da Sessão
        </label>
        <input
          type="date"
          {...register("sessionDate")}
          id="sessionDate"
          className={styles.input}
        />
        {errors.sessionDate && (
          <p className={styles.error}>{errors.sessionDate.message}</p>
        )}
      </div>
      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="duration">
          Duração (minutos)
        </label>
        <input
            type="number"
          {...register("duration", {valueAsNumber: true})}
          id="duration"
          min={5}
          placeholder="Digite a duração em minutos"
          className={styles.input}
        ></input>
        {errors.duration && (
          <p className={styles.error}>{errors.duration.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className={styles.button}
      >
        {mutation.isPending ? "Criando..." : "Criar Sessão"}
      </button>
    </form>
  );
}
