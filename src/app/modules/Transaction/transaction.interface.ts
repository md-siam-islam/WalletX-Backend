export enum transactionstatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}

export enum transactiontype {
    ADD = "add",
    WITHDRAW = "withdraw",
    SEND = "send",
    RECEIVE = "receive"
}


export interface ITransaction {
  type: transactiontype;
  amount: number;          
  from?: string;           
  to?: string;             
  date: Date;              
  status: transactionstatus;
}