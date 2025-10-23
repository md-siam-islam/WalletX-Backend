"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    picture: { type: String, required: false },
    role: { type: String, enum: Object.values(user_interface_1.UserRole), default: user_interface_1.UserRole.USER },
    isActive: { type: String, enum: Object.values(user_interface_1.UserStatus), default: user_interface_1.UserStatus.ACTIVE },
    isVerified: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    walletId: { type: String },
    balance: { type: Number },
    // wallet: { type: mongo.Types.ObjectId, ref: 'Wallet' },
    // transactions: [{ type: mongo.Types.ObjectId, ref: 'Transaction' }]
}, {
    timestamps: true,
    versionKey: false
});
exports.User = (0, mongoose_1.model)('User', userSchema);
