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
exports.seedAdmin = void 0;
const mongoose_1 = require("mongoose");
const env_1 = require("../../config/env");
const user_model_1 = require("../User/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_interface_1 = require("../User/user.interface");
const wallet_model_1 = require("../Wallet/wallet.model");
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Admin_email = env_1.envVariables.ADMIN_EMAIL;
        const Admin_password = env_1.envVariables.ADMIN_PASSWORD;
        const saltRounds = Number(env_1.envVariables.BCRYPT_SALT_ROUNDS) || 10;
        const existAdmin = yield user_model_1.User.findOne({ email: Admin_email });
        if (existAdmin) {
            //   console.log("Admin already exists:", existAdmin.email);
            return;
        }
        const HassPassword = yield bcryptjs_1.default.hash(Admin_password, saltRounds);
        const payload = {
            _id: new mongoose_1.Types.ObjectId(),
            name: "Siam Islam (Admin)",
            email: Admin_email,
            phone: "01951737358",
            password: HassPassword,
            role: user_interface_1.UserRole.ADMIN
        };
        const admin = yield user_model_1.User.create(payload);
        console.log("🎉 Admin create successfully:", admin.email);
        const Admin_Wallet = yield wallet_model_1.Wallet.findOne({ userId: admin._id });
        if (Admin_Wallet) {
            console.log("Admin Wallet already exists:", Admin_Wallet.userId);
            return;
        }
        const Wallet_Payload = {
            userId: admin._id,
            name: admin.name,
            phone: admin.phone,
            balance: 500
        };
        const adminWallet = yield wallet_model_1.Wallet.create(Wallet_Payload);
        console.log("🎉 Admin wallet create  successfully:", adminWallet.phone);
    }
    catch (error) {
        console.error("❌ Error seeding admin:", error instanceof Error ? error.message : error);
    }
});
exports.seedAdmin = seedAdmin;
