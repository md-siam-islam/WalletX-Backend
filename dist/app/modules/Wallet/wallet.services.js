"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletServices = void 0;
const wallet_model_1 = require("./wallet.model");
const transaction_interface_1 = require("../Transaction/transaction.interface");
const user_model_1 = require("../User/user.model");
const addMoney = (amount, decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield wallet_model_1.Wallet.findOne({ userId: decodedUser.userId });
    if (!account) {
        throw new Error("Sorry account not found . place try again ");
    }
    ;
    if (account.balance === undefined) {
        throw new Error("balance not found from 15 line");
    }
    const Amount = Number(amount);
    if (isNaN(Amount) || Amount <= 0) {
        throw new Error("Amount must be greater than 0.💸💸😁");
    }
    const money = account.balance + Amount;
    const transaction = {
        type: transaction_interface_1.transactiontype.ADD,
        amount: amount,
        status: transaction_interface_1.transactionstatus.COMPLETED,
        date: new Date(),
    };
    const UpdateAccount = yield wallet_model_1.Wallet.findByIdAndUpdate(account._id, { balance: money, $push: { transactions: transaction } }, { new: true });
    yield user_model_1.User.findByIdAndUpdate(account.userId, { balance: money });
    return {
        UpdateAccount
    };
});
const sendMoney = (toUserId, amount, DecodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield wallet_model_1.Wallet.findOne({ userId: DecodedUser.userId });
    const receiver = yield wallet_model_1.Wallet.findOne({ userId: toUserId });
    if (!sender) {
        throw new Error("Sender wallet not found");
    }
    ;
    if (!receiver) {
        throw new Error("receiver wallet not found");
    }
    ;
    if (sender.balance === undefined) {
        throw new Error("Sender balance not found");
    }
    if (receiver.balance === undefined) {
        throw new Error("Sender balance not found");
    }
    const Amount = Number(amount);
    if (isNaN(Amount) || Amount <= 0) {
        throw new Error("Amount must be greater than 0.💸💸😁");
    }
    const charge = Math.ceil((Amount / 1000) * 10);
    const totalDeduction = Amount + charge;
    if (sender.balance < Number(totalDeduction)) {
        throw new Error(`Insufficient balance. You need at least ${totalDeduction} taka.`);
    }
    const SenderBalnce = sender.balance - totalDeduction;
    const ReceiverBalnce = receiver.balance + Amount;
    const Sendertransaction = {
        type: transaction_interface_1.transactiontype.SEND,
        amount: amount,
        charge: charge,
        to: receiver.userId,
        status: transaction_interface_1.transactionstatus.COMPLETED,
        date: new Date(),
    };
    const Receivertransaction = {
        type: transaction_interface_1.transactiontype.RECEIVE,
        amount: amount,
        from: sender.userId,
        status: transaction_interface_1.transactionstatus.COMPLETED,
        date: new Date(),
    };
    const UpdateSender = yield wallet_model_1.Wallet.findByIdAndUpdate(sender._id, { balance: SenderBalnce, $push: { transactions: Sendertransaction } }, { new: true });
    const Updatereceiver = yield wallet_model_1.Wallet.findByIdAndUpdate(receiver._id, { balance: ReceiverBalnce, $push: { transactions: Receivertransaction } }, { new: true, runValidators: true });
    yield user_model_1.User.findByIdAndUpdate(sender.userId, { balance: SenderBalnce });
    yield user_model_1.User.findByIdAndUpdate(receiver.userId, { balance: ReceiverBalnce });
    return {
        sender: UpdateSender,
        receiver: Updatereceiver,
    };
});
const cashOut = (agentPhone, amount, decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const Agent = yield user_model_1.User.findOne({ phone: agentPhone });
    const user = yield user_model_1.User.findById(decodedUser.userId);
    const agentWallet = yield wallet_model_1.Wallet.findOne({ userId: Agent === null || Agent === void 0 ? void 0 : Agent._id });
    const userWallet = yield wallet_model_1.Wallet.findOne({ userId: user === null || user === void 0 ? void 0 : user._id });
    if (!user || !userWallet) {
        throw new Error("User wallet not found");
    }
    if (!Agent || !agentWallet) {
        throw new Error("Agent wallet not found");
    }
    if (userWallet.balance === undefined) {
        throw new Error("User balance in not found ");
    }
    if (agentWallet.balance === undefined) {
        throw new Error("Agent balance in not found ");
    }
    const Amount = Number(amount);
    if (isNaN(Amount) || Amount <= 0) {
        throw new Error("Invalid amount");
    }
    if (user.role === "user" && Agent.role !== "agent") {
        throw new Error("You can only cash out to an agent number ❌");
    }
    const charge = Math.ceil((Amount / 1000) * 15);
    const totalAmount = Amount + charge;
    if (userWallet.balance < totalAmount) {
        throw new Error("Insufficient balance");
    }
    const UserNewBlance = userWallet.balance - totalAmount;
    const AgentNewBlance = agentWallet.balance + Amount;
    const Usertransaction = {
        type: transaction_interface_1.transactiontype.WITHDRAW,
        amount: amount,
        charge: charge,
        to: Agent._id,
        status: transaction_interface_1.transactionstatus.COMPLETED,
        date: new Date(),
    };
    const Receivertransaction = {
        type: transaction_interface_1.transactiontype.RECEIVE,
        amount: amount,
        from: user._id,
        status: transaction_interface_1.transactionstatus.COMPLETED,
        date: new Date(),
    };
    const UpdatedUser = yield wallet_model_1.Wallet.findByIdAndUpdate(userWallet._id, { balance: UserNewBlance, $push: { transactions: Usertransaction } }, { new: true, runValidators: true });
    const UpdatedAgent = yield wallet_model_1.Wallet.findByIdAndUpdate(agentWallet._id, { balance: AgentNewBlance, $push: { transactions: Receivertransaction } }, { new: true, runValidators: true });
    yield user_model_1.User.findByIdAndUpdate(user._id, { balance: UserNewBlance });
    yield user_model_1.User.findByIdAndUpdate(Agent._id, { balance: AgentNewBlance });
    return {
        User: UpdatedUser,
        Agent: UpdatedAgent
    };
});
const mywallet = (decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const Mywallet = yield wallet_model_1.Wallet.findOne({ userId: decodedUser.userId });
    if (!Mywallet) {
        throw new Error("User wallet not found");
    }
    return Mywallet;
});
const myTransaction = (decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ phone: decodedUser.phone });
    if (!user) {
        throw new Error("User not found");
    }
    const wallet = yield wallet_model_1.Wallet.findOne({ userId: decodedUser.userId });
    if (!wallet) {
        throw new Error("User wallet not found");
    }
    const Transaction = {
        Transaction: wallet.transactions,
        Name: user.name,
        Phone: user.phone
    };
    return Transaction;
});
// **********User wallet function sector end */*************** */
// cash in user account  *****Agent  section start *****
const cashinUserAccount = (userPhone, amount, decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userWallet = yield wallet_model_1.Wallet.findOne({ phone: userPhone });
    if (!userWallet) {
        throw new Error("User Wallet Not Found 😒 . place try again or , place check your input phone Number . Thankyou 😁");
    }
    if ((userWallet === null || userWallet === void 0 ? void 0 : userWallet.balance) === undefined) {
        throw new Error("userWallet balance not found");
    }
    const user = yield user_model_1.User.findOne({ phone: userPhone });
    if (!user) {
        throw new Error("User Not Found 😒 . place try again. Thankyou 😁");
    }
    const Agentaccount = yield wallet_model_1.Wallet.findOne({ userId: decodedUser.userId });
    if (!Agentaccount) {
        throw new Error("Agentaccount Not Found 😒 . place try again. Thankyou 😁");
    }
    if (Agentaccount.balance === undefined) {
        throw new Error("Agentaccount balance not found");
    }
    const Amount = Number(amount);
    if (isNaN(Amount) || Amount <= 0) {
        throw new Error("Invalid amount");
    }
    if (Agentaccount.balance < Amount) {
        throw new Error(`Insufficient balance. You need at least ${Amount} taka.`);
    }
    const AgentNewBalnce = Agentaccount.balance - Amount;
    const userNewBalnce = userWallet.balance + Amount;
    const AgentTransaction = {
        type: transaction_interface_1.transactiontype.CASHIN,
        amount: Amount,
        to: userWallet.userId,
        date: new Date(),
        status: transaction_interface_1.transactionstatus.COMPLETED
    };
    const UserTransaction = {
        type: transaction_interface_1.transactiontype.CASHIN,
        amount: Amount,
        from: Agentaccount.userId,
        date: new Date(),
        status: transaction_interface_1.transactionstatus.COMPLETED
    };
    const UpdaredAgent = yield wallet_model_1.Wallet.findOneAndUpdate({ userId: Agentaccount.userId }, { balance: AgentNewBalnce, $push: { transactions: AgentTransaction } }, { new: true });
    const Updareduser = yield wallet_model_1.Wallet.findOneAndUpdate({ userId: userWallet.userId }, { balance: userNewBalnce, $push: { transactions: UserTransaction } }, { new: true });
    yield user_model_1.User.findByIdAndUpdate(user._id, { balance: userNewBalnce });
    yield user_model_1.User.findByIdAndUpdate(Agentaccount.userId, { balance: AgentNewBalnce });
    return {
        Agent: UpdaredAgent,
        User: Updareduser
    };
});
exports.WalletServices = {
    addMoney,
    sendMoney,
    cashOut,
    myTransaction,
    mywallet,
    cashinUserAccount
};
