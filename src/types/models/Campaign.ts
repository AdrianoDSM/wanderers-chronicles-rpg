import type { CampaignStatus } from "@/types/enums/CampaignStatus";
import type { UserProps } from "./User";
import type { NoteProps } from "./Note";
import type { SessionProps } from "./Session";
import type { CharacterProps } from "./Character";
import type { PlayerProps } from "./Player";

export interface CampaignProps {
  id: string;
  name: string;
  description?: string | null;
  system: string;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: UserProps;
  players?: PlayerProps[] | null;
  notes?: NoteProps[] | null;
  sessions?: SessionProps[] | null;
  characters?: CharacterProps[] | null;
}
