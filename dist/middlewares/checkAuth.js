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
exports.checkAuth = void 0;
const jwt_1 = require("../app/modules/utils/jwt");
const env_1 = require("../app/config/env");
const user_model_1 = require("../app/modules/User/user.model");
const user_interface_1 = require("../app/modules/User/user.interface");
const checkAuth = (...allowedRole) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeaderToken = req.headers.authorization;
        if (!authHeaderToken) {
            throw new Error("No token Provide");
        }
        const token = authHeaderToken.startsWith("Bearer ") ? authHeaderToken.split(" ")[1] : authHeaderToken;
        const verify = (0, jwt_1.verifyToken)(token, env_1.envVariables.JWT_SECRET);
        const isexitUser = yield user_model_1.User.findOne({ phone: verify.phone });
        if (!isexitUser) {
            throw new Error("User is not not found ");
        }
        if (isexitUser.isActive === user_interface_1.UserStatus.INACTIVE) {
            throw new Error("User is not active from 1");
        }
        if (isexitUser.isActive === user_interface_1.UserStatus.SUSPENDED) {
            throw new Error("User is not active from 2");
        }
        if (isexitUser.isDeleted) {
            throw new Error("User is not active from");
        }
        if (!allowedRole.includes(verify.role)) {
            throw new Error("You are not authorized to access this resource");
        }
        req.user = verify;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
