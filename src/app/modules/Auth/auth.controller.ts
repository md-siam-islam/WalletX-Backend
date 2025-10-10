import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/cathasync"
import { Sendresponse } from "../utils/sendResponsive";
import { AuthServices } from './auth.services';
import { setUserAccesstokenwithUserrefresstoken } from '../utils/setTokenCookies';
import { JwtPayload } from 'jsonwebtoken';

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

const ResetPassword = catchAsync(async (req: Request, res: Response , next: NextFunction) => {

    const oldPassword = req.body.oldPassword 
    const newPassword = req.body.newPassword

    if (!oldPassword || !newPassword) {
        return next(new Error("Old password and new password are required"));
    }

    const decodedUser = req.user

    await AuthServices.userResetPassword(oldPassword , newPassword , decodedUser as JwtPayload)

     Sendresponse(res, {
        success: true,
        statuscode: httpStatus.OK,
        message: "User Reset Password Successfull",
        data: null
    });
})


export const AuthController = {
    Userlogin,
    userLogout,
    ResetPassword
};

