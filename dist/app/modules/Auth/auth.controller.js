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
exports.AuthController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cathasync_1 = require("../utils/cathasync");
const sendResponsive_1 = require("../utils/sendResponsive");
const auth_services_1 = require("./auth.services");
const setTokenCookies_1 = require("../utils/setTokenCookies");
const Userlogin = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    console.log("payload", payload);
    const LoginUser = yield auth_services_1.AuthServices.UserLogin(payload);
    (0, setTokenCookies_1.setUserAccesstokenwithUserrefresstoken)(res, LoginUser);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "User login successful",
        data: LoginUser
    });
}));
const userLogout = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "User Logout Successfull",
        data: null
    });
}));
const ResetPassword = (0, cathasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    if (!oldPassword || !newPassword) {
        return next(new Error("Old password and new password are required"));
    }
    const decodedUser = req.user;
    yield auth_services_1.AuthServices.userResetPassword(oldPassword, newPassword, decodedUser);
    (0, sendResponsive_1.Sendresponse)(res, {
        success: true,
        statuscode: http_status_codes_1.default.OK,
        message: "User Reset Password Successfull",
        data: null
    });
}));
exports.AuthController = {
    Userlogin,
    userLogout,
    ResetPassword
};
