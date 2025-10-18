import { JwtPayload } from "jsonwebtoken"
import { Wallet } from "./wallet.model";
import { transactionstatus, transactiontype } from "../Transaction/transaction.interface";
import { User } from "../User/user.model";
import { error } from "console";

const addMoney = async (amount: string, decodedUser: JwtPayload) => {

    const account = await Wallet.findOne({ userId: decodedUser.userId })

    if (!account) {
        throw new Error("Sorry account not found . place try again ")
    };

    if (account.balance === undefined) {
        throw new Error("balance not found from 15 line")
    }

    const Amount = Number(amount)
    if(isNaN(Amount) || Amount <=0){
        throw new Error("Amount must be greater than 0.💸💸😁");
    }

    const money = account.balance + Amount

        const transaction = {
        type: transactiontype.ADD,
        amount: amount,
        status: transactionstatus.COMPLETED,
        date: new Date(),

    };

    const UpdateAccount = await Wallet.findByIdAndUpdate(account._id, { balance: money, $push: { transactions: transaction } }, { new: true })

    await User.findByIdAndUpdate(account.userId, { balance: money })

    return {
        UpdateAccount
    }

}

const sendMoney = async (toUserId: string, amount: string, DecodedUser: JwtPayload) => {

    const sender = await Wallet.findOne({ userId: DecodedUser.userId });

    const receiver = await Wallet.findOne({ userId: toUserId });

    if (!sender) {
        throw new Error("Sender wallet not found")
    };

    if (!receiver) {
        throw new Error("receiver wallet not found")
    };

    if (sender.balance === undefined) {
        throw new Error("Sender balance not found");
    }
    if (receiver.balance === undefined) {
        throw new Error("Sender balance not found");
    }

   

    const Amount = Number(amount)
    if(isNaN(Amount) || Amount <=0){
        throw new Error("Amount must be greater than 0.💸💸😁");
    }


    const charge = Math.ceil((Amount/1000) * 10)

    const totalDeduction = Amount + charge

     if (sender.balance < Number(totalDeduction)) {
       throw new Error(`Insufficient balance. You need at least ${totalDeduction} taka.`);
    }

    const SenderBalnce = sender.balance - totalDeduction

    const ReceiverBalnce = receiver.balance + Amount

    const Sendertransaction = {
        type: transactiontype.SEND,
        amount: amount,
        charge : charge,
        to: receiver.userId,
        status: transactionstatus.COMPLETED,
        date: new Date(),
    };
    const Receivertransaction = {
        type: transactiontype.RECEIVE,
        amount: amount,
        from: sender.userId,
        status: transactionstatus.COMPLETED,
        date: new Date(),
    };


    const UpdateSender = await Wallet.findByIdAndUpdate(sender._id, { balance: SenderBalnce, $push: { transactions: Sendertransaction } }, { new: true })

    const Updatereceiver = await Wallet.findByIdAndUpdate(receiver._id, { balance: ReceiverBalnce, $push: { transactions: Receivertransaction } }, { new: true, runValidators: true })

    await User.findByIdAndUpdate(sender.userId, { balance: SenderBalnce })
    await User.findByIdAndUpdate(receiver.userId, { balance: ReceiverBalnce })

    return {
        sender: UpdateSender,
        receiver: Updatereceiver,

    };
}

const cashOut = async(agentPhone : string , amount : string , decodedUser : JwtPayload) => {

    const Agent = await User.findOne({phone : agentPhone})
    const user = await User.findById(decodedUser.userId)
    const agentWallet = await Wallet.findOne({userId : Agent?._id})
    const userWallet = await Wallet.findOne({userId : user?._id})

    if (!user || !userWallet) {
    throw new Error("User wallet not found");
    }

  if (!Agent || !agentWallet) {
    throw new Error("Agent wallet not found");
    }

  if(userWallet.balance === undefined){
    throw new Error("User balance in not found ");
    }
  if(agentWallet.balance === undefined){
    throw new Error("Agent balance in not found ");
    }

  const Amount = Number(amount)
  if(isNaN(Amount) || Amount <=0){
    throw new Error("Invalid amount");
    }


  if(user.role === "user" && Agent.role !== "agent"){
    throw new Error("You can only cash out to an agent number ❌");
    }

  const charge = Math.ceil((Amount / 1000) * 15)
  const totalAmount = Amount + charge


  if(userWallet.balance < totalAmount){
     throw new Error("Insufficient balance");
    }

    const UserNewBlance = userWallet.balance - totalAmount
    const AgentNewBlance = agentWallet.balance + Amount

        const Usertransaction = {
        type: transactiontype.WITHDRAW,
        amount: amount,
        charge : charge,
        to: Agent._id,
        status: transactionstatus.COMPLETED,
        date: new Date(),
    };
    const Receivertransaction = {
        type: transactiontype.RECEIVE,
        amount: amount,
        from: user._id,
        status: transactionstatus.COMPLETED,
        date: new Date(),
    };

    const UpdatedUser = await Wallet.findByIdAndUpdate(userWallet._id ,{balance : UserNewBlance , $push:{transactions : Usertransaction }}, {new : true , runValidators : true})

    const UpdatedAgent= await Wallet.findByIdAndUpdate( agentWallet._id , {balance :AgentNewBlance , $push:{transactions : Receivertransaction }}, {new : true , runValidators : true})


    await User.findByIdAndUpdate(user._id, { balance: UserNewBlance })
    await User.findByIdAndUpdate(Agent._id, { balance: AgentNewBlance })

    return {
        User : UpdatedUser,
        Agent : UpdatedAgent
    }

}

const myTransaction = async (decodedUser : JwtPayload) => {

    const user = await User.findOne({phone : decodedUser.phone})

    if(!user){
      throw new Error("User not found");
    }

    const wallet = await Wallet.findOne({userId : decodedUser.userId})

    if(!wallet){
      throw new Error("User wallet not found");
    }

    const Transaction = {
        Transaction : wallet.transactions,
        Name : user.name,
        Phone : user.phone
    }

    return Transaction
}



export const WalletServices = {
    addMoney,
    sendMoney,
    cashOut,
    myTransaction
}