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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cathasync_1 = require("../utils/cathasync");
const wallet_services_1 = require("./wallet.services");
const sendResponsive_1 = require("../utils/sendResponsive");
const UserAddMoney = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = req.body.amount;
    const decodedUser = req.user;
    const AddMoney = yield wallet_services_1.WalletServices.addMoney(amount, decodedUser);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "Add Money succesfull",
        data: AddMoney
    });
}));
const UserSendMoney = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const {toUserId , amount} = req.body
    const toUserId = req.body.toUserId;
    const amount = req.body.amount;
    const DecodedUser = req.user;
    const sendmoney = yield wallet_services_1.WalletServices.sendMoney(toUserId, amount, DecodedUser);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "Send Money Successfull",
        data: sendmoney
    });
}));
//  cash out to agent account 
const UsercashOut = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const agentPhone = req.body.agentPhone;
    const amount = req.body.amount;
    const decodedUser = req.user;
    const Cashout = yield wallet_services_1.WalletServices.cashOut(agentPhone, amount, decodedUser);
    console.log(Cashout);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "Cash Out Successfull",
        data: Cashout
    });
}));
const myWallet = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUser = req.user;
    console.log("decodedUser", decodedUser);
    const wallet = yield wallet_services_1.WalletServices.mywallet(decodedUser);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "Wallet get Successfull",
        data: wallet
    });
}));
const myTransaction = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUser = req.user;
    const getTransaction = yield wallet_services_1.WalletServices.myTransaction(decodedUser);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "Transaction get Successfull",
        data: getTransaction
    });
}));
// Agent cash in user account 
const CashinUserAccount = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userPhone = req.body.userPhone;
    const amount = req.body.amount;
    const decodedUser = req.user;
    console.log("User Phone ", userPhone);
    const cashIn = yield wallet_services_1.WalletServices.cashinUserAccount(userPhone, amount, decodedUser);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "Cash in to user account Successfull",
        data: cashIn
    });
}));
exports.WalletController = {
    UserAddMoney,
    UserSendMoney,
    UsercashOut,
    myTransaction,
    myWallet,
    CashinUserAccount
};
