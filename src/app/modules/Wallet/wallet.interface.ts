import { Types } from "mongoose";
import { ITransaction } from "../Transaction/transaction.interface";


export interface IWallet {
  userId: Types.ObjectId; 
  balance?: number; 
  currency?: string; 
  transactions?: ITransaction[]; 
}