"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const wallet_interface_1 = require("./wallet.interface");
const transaction_model_1 = require("../Transaction/transaction.model");
const WalletSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    balance: { type: Number, default: 50 },
    phone: { type: String },
    currency: { type: String, default: "BDT" },
    status: { type: String, enum: Object.values(wallet_interface_1.Walletstatus), default: wallet_interface_1.Walletstatus.ACTIVE },
    transactions: { type: [transaction_model_1.TransactionSchema], default: [] },
}, {
    timestamps: true,
    versionKey: false
});
exports.Wallet = (0, mongoose_1.model)("Wallet", WalletSchema);
