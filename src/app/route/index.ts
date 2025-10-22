import express from 'express';
import { UserRoute } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { WalletRouter } from '../modules/Wallet/wallet.route';
import { becomeaAgentRoute } from '../modules/BecomeAagent/becomeaAgent.route';

export const router = express.Router();

const RouterModule = [

    {
        path : "/user",
        route : UserRoute
    },
    {
        path : "/auth",
        route : AuthRoutes
    },
    {
        path : "/wallet",
        route : WalletRouter
    },
    {
        path : "/become-agent",
        route : becomeaAgentRoute
    }
]

RouterModule.forEach((route) => {
    router.use(route.path , route.route);
})