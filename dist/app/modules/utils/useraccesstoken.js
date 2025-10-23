"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccessToken = void 0;
const jwt_1 = require("./jwt");
const env_1 = require("../../config/env");
const UserAccessToken = (user) => {
    const JwtPayload = {
        userId: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        walletId: user.walletId,
        balance: user.balance
    };
    const useraccessToken = (0, jwt_1.createToken)(JwtPayload, env_1.envVariables.JWT_SECRET, env_1.envVariables.JWT_ACCESS_TOKEN_EXPIRE);
    const userrefToken = (0, jwt_1.createToken)(JwtPayload, env_1.envVariables.JWT_SECRET, env_1.envVariables.JWT_ACCESS_TOKEN_EXPIRE);
    return {
        accessToken: useraccessToken,
        refreshToken: userrefToken
    };
};
exports.UserAccessToken = UserAccessToken;
