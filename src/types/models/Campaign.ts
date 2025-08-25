import type { CampaignStatus } from "@/types/enums/CampaignStatus";
import type { UserProps } from "./User";
import type { NoteProps } from "./Note";
import type { SessionProps } from "./Session";
import type { CharacterProps } from "./Character";

export interface CampaignProps {
  id: string;
  name: string;
  description?: string | null;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: UserProps;
  notes?: NoteProps[] | null;
  sessions?: SessionProps[] | null;
  characters?: CharacterProps[] | null;
}
