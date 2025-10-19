import { Types } from "mongoose";
import { ITransaction } from "../Transaction/transaction.interface";

export enum Walletstatus {
  ACTIVE = "active",
  BLOCK = "block"
}


export interface IWallet {
  userId: Types.ObjectId;
  balance?: number; 
  currency?: string; 
  status: Walletstatus;
  transactions?: ITransaction[]; 
}