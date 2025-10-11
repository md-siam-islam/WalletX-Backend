import { JwtPayload } from "jsonwebtoken"
import { Wallet } from "./wallet.model";
import { transactionstatus, transactiontype } from "../Transaction/transaction.interface";
import { User } from "../User/user.model";


const sendMoney = async (toUserId : string , amount : string , DecodedUser : JwtPayload) => {

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

    if (sender.balance < Number(amount)) {
        throw new Error("Insufficient balance");
    }

    const SenderBalnce = sender.balance - Number(amount)

    const ReceiverBalnce = receiver.balance + Number(amount)

    const transaction = {
    type: transactiontype.SEND,
    amount: amount,
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



const UpdateSender = await Wallet.findByIdAndUpdate(sender._id , { balance:SenderBalnce , $push: {transactions : transaction}} , { new : true , runValidators : true} )

const Updatereceiver = await Wallet.findByIdAndUpdate(receiver._id , { balance:ReceiverBalnce , $push: {transactions : Receivertransaction}} , { new : true , runValidators : true} )

await User.findByIdAndUpdate(sender.userId , {balance : SenderBalnce})
await User.findByIdAndUpdate(receiver.userId , {balance : ReceiverBalnce})

return {
    sender: UpdateSender,
    receiver: Updatereceiver,

  };


}

export const WalletServices ={
    sendMoney
}