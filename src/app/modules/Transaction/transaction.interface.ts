export enum transactionstatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}

export enum transactiontype {
    ADD = "add",
    WITHDRAW = "withdraw",
    TRANSFER = "transfer"
}

export interface ITransaction {
  type: transactiontype;
  amount: number;          
  from?: string;           
  to?: string;             
  date: Date;              
  status: transactionstatus;
}