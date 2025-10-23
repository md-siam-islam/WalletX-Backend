"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const wallet_route_1 = require("../modules/Wallet/wallet.route");
const becomeaAgent_route_1 = require("../modules/BecomeAagent/becomeaAgent.route");
exports.router = express_1.default.Router();
const RouterModule = [
    {
        path: "/user",
        route: user_route_1.UserRoute
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/wallet",
        route: wallet_route_1.WalletRouter
    },
    {
        path: "/become-agent",
        route: becomeaAgent_route_1.becomeaAgentRoute
    }
];
RouterModule.forEach((route) => {
    exports.router.use(route.path, route.route);
});
