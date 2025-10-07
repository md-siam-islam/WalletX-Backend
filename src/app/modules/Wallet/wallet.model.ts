import { model, Schema } from "mongoose";
import { IWallet } from "./wallet.interface";
import { TransactionSchema } from "../Transaction/transaction.model";

const WalletSchema = new Schema<IWallet>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, default: 50 },
    currency: { type: String, default: "BDT" },
    transactions: { type: [TransactionSchema], default: [] },
  },
  {
    timestamps : true,
    versionKey : false
});

export const Wallet = model<IWallet>("Wallet" , WalletSchema);