import type { CampaignProps } from "./Campaign";
import type { SessionProps } from "./Session";

export interface NoteProps {
  id: string;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  campaignId: string;
  campaign: CampaignProps;
  sessionId?: string;
  session?: SessionProps;
}
