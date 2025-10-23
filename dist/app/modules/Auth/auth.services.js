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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const user_model_1 = require("../User/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const useraccesstoken_1 = require("../utils/useraccesstoken");
const env_1 = require("../../config/env");
const UserLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = payload;
    console.log(phone, password);
    const userAccount = yield user_model_1.User.findOne({ phone });
    if (!userAccount) {
        throw new Error("User not found");
    }
    const usertoken = (0, useraccesstoken_1.UserAccessToken)(userAccount);
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, userAccount.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid password");
    }
    const _a = userAccount.toObject(), { password: userPassword } = _a, user = __rest(_a, ["password"]);
    return {
        accessToken: usertoken.accessToken,
        refreshToken: usertoken.refreshToken,
        User: user
    };
});
const userResetPassword = (oldPassword, newPassword, decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedUser.userId);
    if (!user) {
        throw new Error("User not found from UserResetPassword");
    }
    const isMatch = bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVariables.BCRYPT_SALT_ROUNDS));
    yield user.save();
    return {
        success: true,
        message: "Password reset successful"
    };
});
exports.AuthServices = {
    UserLogin,
    userResetPassword
};
