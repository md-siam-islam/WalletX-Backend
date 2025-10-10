import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/cathasync"
import { Sendresponse } from "../utils/sendResponsive";
import { AuthServices } from './auth.services';
import { setUserAccesstokenwithUserrefresstoken } from '../utils/setTokenCookies';

const Userlogin = catchAsync(async (req: Request, res: Response , next: NextFunction) => {

    const payload = req.body;

    console.log("payload", payload);

    const LoginUser = await AuthServices.UserLogin(payload);

    setUserAccesstokenwithUserrefresstoken(res,LoginUser)

    Sendresponse(res ,{
        success : true,
        statuscode : httpStatus.OK,
        message : "User login successful",
        data :LoginUser
       })

})

export const AuthController = {
    Userlogin
};

