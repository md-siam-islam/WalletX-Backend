import httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/cathasync";
import { WalletServices } from "./wallet.services";
import { JwtPayload } from "jsonwebtoken";
import { Sendresponse } from "../utils/sendResponsive";

 
const UserAddMoney = catchAsync(async (req:Request , res: Response , next: NextFunction) => {


    const amount = req.body.amount
    const decodedUser = req.user

    const AddMoney = await WalletServices.addMoney( amount , decodedUser as JwtPayload)

    Sendresponse(res, {
        success : true,
        statuscode : httpStatus.OK,
        message : "Add Money succesfull",
        data : AddMoney
    })


})
 const UserSendMoney = catchAsync(async (req:Request , res: Response , next: NextFunction) => {

    // const {toUserId , amount} = req.body

    const toUserId = req.body.toUserId
    const amount = req.body.amount

    const DecodedUser = req.user

    const sendmoney = await WalletServices.sendMoney(toUserId , amount , DecodedUser as JwtPayload)

     Sendresponse(res ,{
        success : true,
        statuscode : httpStatus.OK,
        message : "Send Money Successfull",
        data :sendmoney
       })


 })


 export const WalletController = {
    UserAddMoney,
    UserSendMoney
 } 