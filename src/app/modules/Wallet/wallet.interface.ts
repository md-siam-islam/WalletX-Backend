
enum transactionstatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}

enum transactiontype {
    ADD = "add",
    WITHDRAW = "withdraw",
    TRANSFER = "transfer"
}

export interface ITransaction {
  transactionId: string;   
  type: transactiontype;
  amount: number;          
  from?: string;           
  to?: string;             
  date: Date;              
  status: transactionstatus;
}

export interface IWallet {
  userId: string; 
  balance?: number; 
  currency?: string; 
  transactions: ITransaction[]; 
}