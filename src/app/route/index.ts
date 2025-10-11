import express from 'express';
import { UserRoute } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { WalletRouter } from '../modules/Wallet/wallet.route';

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
        path : "wallet",
        route : WalletRouter
    }
]

RouterModule.forEach((route) => {
    router.use(route.path , route.route);
})