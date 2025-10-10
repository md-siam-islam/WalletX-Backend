import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/cathasync"
import { Sendresponse } from "../utils/sendResponsive";
import { AuthServices } from './auth.services';

const Userlogin = catchAsync(async (req: Request, res: Response , next: NextFunction) => {

    const payload = req.body;

    console.log("payload", payload);

    const LoginUser = await AuthServices.UserLogin(payload);

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

