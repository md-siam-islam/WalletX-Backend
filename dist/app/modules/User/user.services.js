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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const user_interface_1 = require("./user.interface");
const wallet_model_1 = require("../Wallet/wallet.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const Createuser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield user_model_1.User.startSession();
    session.startTransaction();
    // create user logic here
    try {
        const { name, phone, password, email } = payload;
        const phoneExists = yield user_model_1.User.findOne({ phone });
        if (phoneExists) {
            throw new Error("Phone number already exists");
        }
        const emailExists = yield user_model_1.User.findOne({ email });
        if (emailExists) {
            throw new Error("Email already exists");
        }
        const HassPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVariables.BCRYPT_SALT_ROUNDS));
        const user = yield user_model_1.User.create([{ name, phone, password: HassPassword, email }], { session });
        const wallet = yield wallet_model_1.Wallet.create([{ userId: user[0]._id, phone: user[0].phone, name: user[0].name }], { session });
        const updateuser = yield user_model_1.User.findByIdAndUpdate(user[0]._id, { walletId: wallet[0]._id, balance: wallet[0].balance }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return {
            User: updateuser,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllusers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    const totalUser = yield user_model_1.User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUser
        }
    };
});
const getSingleuser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new Error("User id is required");
    }
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
const updateUser = (userId, payload, decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    if (payload.role) {
        if (decodedUser.role === user_interface_1.UserRole.USER || decodedUser.role === user_interface_1.UserRole.AGENT) {
            throw new Error("You are not authorized to update user role");
        }
    }
    if (payload.isActive || payload.isVerified || payload.isDeleted) {
        if (decodedUser.role === user_interface_1.UserRole.USER || decodedUser.role === user_interface_1.UserRole.AGENT) {
            throw new Error("You are not authorized to update user isActive");
        }
    }
    if (payload.phone) {
        throw new Error("You are not change Phone Number");
    }
    if (payload.password) {
        const hassedPassword = yield bcryptjs_1.default.hash(payload.password, Number(env_1.envVariables.BCRYPT_SALT_ROUNDS));
        payload.password = hassedPassword;
    }
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return updatedUser;
});
exports.UserService = {
    Createuser,
    getAllusers,
    getSingleuser,
    updateUser
};
