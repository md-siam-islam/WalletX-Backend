import { NextFunction, Request, Response } from "express";


export const checkAuth = async (...allowedRole : string[]) => (req:Request , res: Response , next: NextFunction ) => {

    const authHeaderToken = req.headers.authorization

    if(!authHeaderToken) {
        throw new Error ("No token Provide")
    }

    const token = authHeaderToken.startsWith("Bearer ")?authHeaderToken.split(" ")[1] : authHeaderToken

    


}