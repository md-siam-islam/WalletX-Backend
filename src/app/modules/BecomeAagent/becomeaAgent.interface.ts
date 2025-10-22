import { Types } from "mongoose";

export enum AgentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected"
}

export interface IAgentApplication {
    userId : Types.ObjectId;
  fullName: string;
  email?: string;
  phone: string;
  address?: string;
  district?: string;
  status: AgentStatus
}