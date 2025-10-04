import express from 'express';
import { UserRoute } from '../modules/User/user.route';

export const router = express.Router();

const RouterModule = [

    {
        path : "/user",
        route : UserRoute
    }
]

RouterModule.forEach((route) => {
    router.use(route.path , route.route);
})