"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserAccesstokenwithUserrefresstoken = void 0;
const setUserAccesstokenwithUserrefresstoken = (res, tokenInfo) => {
    if (tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "none"
        });
    }
    if (tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "none"
        });
    }
};
exports.setUserAccesstokenwithUserrefresstoken = setUserAccesstokenwithUserrefresstoken;
