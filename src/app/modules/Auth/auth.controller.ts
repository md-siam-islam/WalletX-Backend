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


const userLogout = catchAsync(async (req: Request, res: Response , next: NextFunction) => {
    res.clearCookie("accessToken" , {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    })
    res.clearCookie("refreshToken" , {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    })

        Sendresponse(res, {
        success: true,
        statuscode: httpStatus.OK,
        message: "User Logout Successfull",
        data: null
            });
})

export const AuthController = {
    Userlogin,
    userLogout
};

