import type { CampaignProps } from "./Campaign";
import type { CharacterStatus } from "@/types/enums/CharacterStatus";
import type { CharacterType } from "@/types/enums/CharacterType";

export interface CharacterProps {
  id: string;
  name: string;
  description?: string;
  type: CharacterType;
  status: CharacterStatus;
  imageUrl: string;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  createdAt: string;
  updatedAt: string;

  campaignId: string;
  campaign: CampaignProps;
}
