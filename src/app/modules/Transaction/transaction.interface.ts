export enum transactionstatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}

export enum transactiontype {
    ADD = "add",
    WITHDRAW = "withdraw",
    SEND = "send",
    RECEIVE = "receive",
    CASHIN = "Cash-in"
}


export interface ITransaction {
  type: transactiontype;
  amount: number;
  charge?: number;          
  from?: string;           
  to?: string;             
  date: Date;              
  status: transactionstatus;
}