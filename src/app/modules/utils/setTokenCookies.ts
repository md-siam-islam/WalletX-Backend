import { Response } from "express";

interface Tokeninfo {
    accessToken?: string
    refreshToken?: string
}

export const setUserAccesstokenwithUserrefresstoken = (res:Response , tokenInfo : Tokeninfo) => {

   if(tokenInfo?.accessToken){
    res.cookie("accessToken" , tokenInfo.accessToken , {
        httpOnly : true,
        secure : false
    })
   }
   if(tokenInfo?.refreshToken){
    res.cookie("refreshToken" , tokenInfo.refreshToken , {
        httpOnly : true,
        secure : false
    })
   }
}