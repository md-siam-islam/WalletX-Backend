import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../app/modules/utils/jwt";
import { envVariables } from "../app/config/env";
import { User } from "../app/modules/User/user.model";
import { JwtPayload } from "jsonwebtoken";
import { UserStatus } from "../app/modules/User/user.interface";


export const checkAuth =  (...allowedRole : string[]) => async (req:Request , res: Response , next: NextFunction ) => {

   try {
     const authHeaderToken = req.headers.authorization

    if(!authHeaderToken) {
        throw new Error ("No token Provide")
    }

    const token = authHeaderToken.startsWith("Bearer ")?authHeaderToken.split(" ")[1] : authHeaderToken

    const verify = verifyToken(token , envVariables.JWT_SECRET) as JwtPayload

    const isexitUser = await User.findOne({phone : verify.phone})

    if(!isexitUser){
        throw new Error ("User is not not found ")
    }

    if(isexitUser.isActive === UserStatus.INACTIVE){
        throw new Error ("User is not active from 1")
    }

    if(isexitUser.isActive === UserStatus.SUSPENDED){
        throw new Error ("User is not active from 2")
    }
    if(isexitUser.isDeleted){
        throw new Error ("User is not active from")
    }

    if(!allowedRole.includes(verify.role)){
        throw new Error("You are not authorized to access this resource")
    }

    req.user = verify
    next()

   } catch (error) {
    next(error);
   }

}