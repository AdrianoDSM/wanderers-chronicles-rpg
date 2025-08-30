"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import styles from "./CreateCharacterForm.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCharacter } from "@/lib/actions/createCharacter";
import { getCampaignIdBySlug } from "@/lib/actions/getCampaignIdBySlug";
import { getAvailablePlayers } from "@/lib/actions/getAvailablePlayers";
import { CharacterStatus } from "@/types/enums/CharacterStatus";
import { CharacterType } from "@/types/enums/CharacterType";
import { FileUploader } from "react-drag-drop-files";
import { useImageStore } from "@/store/useImageStore";
import Image from "next/image";

export const createCharacterSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  race: z.string().optional(),
  class: z.string().optional(),
  level: z.number().min(1).max(20).optional(),
  description: z.string().max(450).optional(),
  type: z.nativeEnum(CharacterType, { required_error: "Tipo é obrigatório" }),
  status: z.nativeEnum(CharacterStatus).optional(),
  imageUrl: z.string().url({ message: "URL inválida" }),
  playerId: z.string().optional(),
});

type CreateCharacterInput = z.infer<typeof createCharacterSchema>;

export function CreateCharacterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCharacterInput>({
    resolver: zodResolver(createCharacterSchema),
  });

  const router = useRouter();
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
      ? params.slug[0]
      : "";

  const { previewUrl, setImage, clearImage } = useImageStore();

  const handleImageChange = (input: File | File[]) => {
    const file = Array.isArray(input) ? input[0] : input;
    const url = URL.createObjectURL(file);
    setImage(file, url);
    setValue("imageUrl", url);
  };

  const type = watch("type");
  const description = watch("description") || "";

  const { data: campaignId } = useQuery({
    queryKey: ["campaignId", slug],
    queryFn: () => getCampaignIdBySlug(slug),
    enabled: !!slug,
  });

  const { data: players = [] } = useQuery({
    queryKey: ["availablePlayers", campaignId],
    queryFn: () => getAvailablePlayers(campaignId!),
    enabled: type === "PC" && !!campaignId,
  });

  const mutation = useMutation({
    mutationFn: createCharacter,
    onSuccess: () => {
      toast.success("Personagem criado com sucesso!");
      clearImage();
      router.push(`/campaigns/${slug}/characters`);
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar personagem"
      );
    },
  });

  const onSubmit = (data: CreateCharacterInput) => {
    if (!campaignId) {
      toast.error("Campanha não encontrada");
      return;
    }

    mutation.mutate({ ...data, campaignId });
  };

  function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="name">
          Nome
        </label>
        <input
          {...register("name")}
          id="name"
          className={styles.input}
          placeholder="Nome do personagem"
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="race">
          Raça
        </label>
        <input
          {...register("race")}
          id="race"
          className={styles.input}
          placeholder="Raça (opcional)"
        />
      </div>

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="class">
          Classe
        </label>
        <input
          {...register("class")}
          id="class"
          className={styles.input}
          placeholder="Classe (opcional)"
        />
      </div>

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="level">
          Nível
        </label>
        <input
          type="number"
          {...register("level", { valueAsNumber: true })}
          id="level"
          className={styles.input}
          min={1}
          max={20}
          placeholder="Nível (1–20)"
        />
        {errors.level && <p className={styles.error}>{errors.level.message}</p>}
      </div>

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="description">
          Descrição
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={4}
          maxLength={450}
          onInput={autoResize}
          placeholder="História ou detalhes do personagem"
          className={styles.textarea}
        />
        <div className={styles.charCount}>{description.length}/450</div>
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="type">Tipo</label>
        <select {...register("type")} id="type" className={styles.select}>
          <option value="">Selecione</option>
          <option value="PC">PC</option>
          <option value="NPC">NPC</option>
        </select>
        {errors.type && <p className={styles.error}>{errors.type.message}</p>}
      </div>

      {type === "PC" && (
        <div className={styles.formItem}>
          <label className={styles.label} htmlFor="playerId">Vincular a Jogador</label>
          <select {...register("playerId")} id="playerId" className={styles.select}>
            <option value="">Selecione um jogador</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="status">
          Status
        </label>
        <select {...register("status")} id="status" className={styles.select}>
          <option value="ALIVE">Vivo</option>
          <option value="DEAD">Morto</option>
          <option value="UNKNOWN">Desconhecido</option>
        </select>
      </div>

      <div className={styles.formItem}>
        <label className={styles.label} htmlFor="imageUrl">
          Imagem
        </label>
        <input
          {...register("imageUrl")}
          id="imageUrl"
          className={styles.input}
          placeholder="URL da imagem do personagem"
        />
        {errors.imageUrl && (
          <p className={styles.error}>{errors.imageUrl.message}</p>
        )}
      </div>
      <div className={styles.formItem}>
        <label className={styles.label}>Imagem do Personagem</label>
        <FileUploader
          handleChange={handleImageChange}
          name="characterImage"
          types={["JPG", "PNG", "JPEG"]}
          maxSize={2}
        />
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview do personagem"
            width={300}
            height={300}
            className={styles.previewImage}
            style={{ objectFit: "cover" }}
          />
        )}
        {errors.imageUrl && (
          <p className={styles.error}>{errors.imageUrl.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className={styles.button}
      >
        {mutation.isPending ? "Criando..." : "Criar Personagem"}
      </button>
    </form>
  );
}
