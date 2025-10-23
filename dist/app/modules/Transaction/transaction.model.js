"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSchema = void 0;
const mongoose_1 = require("mongoose");
const transaction_interface_1 = require("./transaction.interface");
exports.TransactionSchema = new mongoose_1.Schema({
    type: { type: String, enum: Object.values(transaction_interface_1.transactiontype), required: true },
    amount: { type: Number, required: true },
    charge: { type: Number },
    from: { type: String },
    to: { type: String },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: Object.values(transaction_interface_1.transactionstatus), default: transaction_interface_1.transactionstatus.COMPLETED },
}, {
    timestamps: true,
    versionKey: false
});
