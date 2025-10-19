
import { model, Schema } from "mongoose";
import { IWallet, Walletstatus } from "./wallet.interface";
import { TransactionSchema } from "../Transaction/transaction.model";

const WalletSchema = new Schema<IWallet>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, default: 50 },
    currency: { type: String, default: "BDT" },
    status : {type : String , enum :Object.values(Walletstatus) , default : Walletstatus.ACTIVE},
    transactions: { type: [TransactionSchema], default: [] },
  },
  {
    timestamps : true,
    versionKey : false
});

export const Wallet = model<IWallet>("Wallet" , WalletSchema);