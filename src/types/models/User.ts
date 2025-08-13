import type { CampaignProps } from "./Campaign";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  campaigns?: CampaignProps[];
}
