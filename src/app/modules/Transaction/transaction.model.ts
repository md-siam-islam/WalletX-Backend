import { Schema } from "mongoose";
import { ITransaction, transactionstatus, transactiontype } from "./transaction.interface";

export const TransactionSchema = new Schema<ITransaction>(
  {
    type: { type: String, enum: Object.values(transactiontype), required: true },
    amount: { type: Number, required: true },
    from: { type: String },
    to: { type: String },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: Object.values(transactionstatus), default: transactionstatus.COMPLETED },
  },
  {
    timestamps : true,
    versionKey : false
  }

);