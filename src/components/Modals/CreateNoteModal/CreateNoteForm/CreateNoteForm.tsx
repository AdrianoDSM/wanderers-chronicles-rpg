"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { createNote } from "@/lib/actions/createNote";
import { getSessionsByCampaign } from "@/lib/actions/getSessionsByCampaign";
import { getCharactersByCampaignAndType } from "@/lib/actions/getCharactersByCampaignAndType";
import { NoteType } from "@/types/enums/NoteType";
import { CharacterType } from "@/types/enums/CharacterType";
import styles from "./CreateNoteForm.module.css";
import { getCampaignIdBySlug } from "@/lib/actions/getCampaignIdBySlug";

const createNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, { message: "Conteúdo obrigatório" }),
  type: z.nativeEnum(NoteType),
  sessionId: z.string().optional(),
  characterId: z.string().optional(),
}).refine((data) => {
  if (data.type === "NPC") {
    return !!data.characterId;
  }
  return true;
}, {
  message: "É necessário selecionar um NPC",
  path: ["characterId"],
});

type CreateNoteInput = z.infer<typeof createNoteSchema>;

type Props = {
  characterId?: string; // opcional se quiser pré-vincular
};

export function CreateNoteForm({ characterId }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
  });

  const router = useRouter();
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
      ? params.slug[0]
      : "";

  const type = watch("type");

  const { data: campaignId } = useQuery({
  queryKey: ["campaignId", slug],
  queryFn: () => getCampaignIdBySlug(slug),
  enabled: !!slug,
});


  const { data: sessions = [] } = useQuery({
    queryKey: ["sessions", campaignId],
    queryFn: () => getSessionsByCampaign(campaignId!),
    enabled: !!campaignId,
  });

  const { data: npcs = [] } = useQuery({
    queryKey: ["npcs", campaignId],
    queryFn: () => getCharactersByCampaignAndType(campaignId!, "NPC" as CharacterType),
    enabled: !!campaignId,
  });

  const mutation = useMutation({
    mutationFn: (data: CreateNoteInput) =>
      createNote({
        ...data,
        slug,
        characterId: data.characterId ?? characterId ?? null,
      }),
    onSuccess: () => {
      toast.success("Nota criada com sucesso!");
      router.push(`/campaigns/${slug}/notes`);
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar nota"
      );
    },
  });

  const onSubmit = (data: CreateNoteInput) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="title">Título (opcional)</label>
        <input
          {...register("title")}
          id="title"
          className={styles.input}
          placeholder="Título da nota"
        />
      </div>

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="content">Conteúdo</label>
        <textarea
          {...register("content")}
          id="content"
          rows={4}
          className={styles.textarea}
          placeholder="Escreva sua nota aqui..."
        />
        {errors.content && (
          <p className={styles.error}>{errors.content.message}</p>
        )}
      </div>

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="type">Tipo</label>
        <select {...register("type")} id="type" className={styles.select}>
          <option value="">Selecione o tipo</option>
          <option value="PLANNING">Planejamento</option>
          <option value="LORE">Lore</option>
          <option value="NPC">NPC</option>
        </select>
      </div>

      {(type === "PLANNING" || type === "LORE") && (
        <div className={styles.formItem}>
          <label className={styles.label} htmlFor="sessionId">Associar a Sessão (opcional)</label>
          <select {...register("sessionId")} id="sessionId" className={styles.select}>
            <option value="">Nenhuma sessão</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {type === "NPC" && (
        <div className={styles.formItem}>
          <label className={styles.label} htmlFor="characterId">Vincular a NPC</label>
          <select {...register("characterId")} id="characterId" className={styles.select}>
            <option value="">Selecione um NPC</option>
            {npcs.map((npc) => (
              <option key={npc.id} value={npc.id}>
                {npc.name}
              </option>
            ))}
          </select>
          {errors.characterId && (
            <p className={styles.error}>{errors.characterId.message}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className={styles.button}
      >
        {mutation.isPending ? "Criando..." : "Criar Nota"}
      </button>
    </form>
  );
}
