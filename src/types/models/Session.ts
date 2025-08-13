import type { CampaignProps } from "./Campaign";
import type { NoteProps } from "./Note";

export interface SessionProps {
  id: string;
  title: string;
  sessionDate: string;
  createdAt: string;
  updatedAt: string;
  campaignId: string;
  campaign: CampaignProps;
  note?: NoteProps;
}
