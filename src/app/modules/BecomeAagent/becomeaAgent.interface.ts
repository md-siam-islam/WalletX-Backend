
export enum AgentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected"
}

export interface IAgentApplication {
  fullName: string;
  email?: string;
  phone: string;
  address?: string;
  district?: string;
  status: AgentStatus
}