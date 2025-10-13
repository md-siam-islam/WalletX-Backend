import { JwtPayload } from "jsonwebtoken"
import { Wallet } from "./wallet.model";
import { transactionstatus, transactiontype } from "../Transaction/transaction.interface";
import { User } from "../User/user.model";

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
        from: sender.userId,
        to: receiver.userId,
        status: transactionstatus.COMPLETED,
        date: new Date(),

    };
    const Receivertransaction = {
        type: transactiontype.RECEIVE,
        amount: amount,
        from: sender.userId,
        to: receiver.userId,
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




export const WalletServices = {
    addMoney,
    sendMoney
}