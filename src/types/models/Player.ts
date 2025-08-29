import { CharacterProps } from "./Character";
import { CampaignProps } from "@/types/models/Campaign";

export interface PlayerProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  campaignId: string;
  campaign: CampaignProps;
  character?: CharacterProps;
}
