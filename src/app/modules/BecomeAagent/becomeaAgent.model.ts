import { Schema } from "mongoose";
import { AgentStatus, IAgentApplication } from "./becomeaAgent.interface";


export const AgentSchema = new Schema<IAgentApplication>(
    {
    fullName: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    address: { type: String },
    district: { type: String },
    status: { type: String, enum:Object.values(AgentStatus), default: AgentStatus.PENDING }
  },
  {
    timestamps : true,
    versionKey : false  

    }
)
