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

//  cash out to agent account 

const UsercashOut =  catchAsync(async (req:Request , res: Response , next: NextFunction) => {

    const agentPhone = req.body.agentPhone
    const amount = req.body.amount

    const decodedUser = req.user;

    const Cashout = await WalletServices.cashOut(agentPhone ,amount, decodedUser as JwtPayload)

    console.log(Cashout)

    Sendresponse(res ,{
        success : true,
        statuscode : httpStatus.OK,
        message : "Cash Out Successfull",
        data : Cashout
       })

})

const myWallet =  catchAsync(async (req:Request , res: Response , next: NextFunction) =>{

    const decodedUser = req.user

    console.log( "decodedUser", decodedUser)

    const wallet = await WalletServices.mywallet(decodedUser as JwtPayload)

    Sendresponse(res ,{
        success : true,
        statuscode : httpStatus.OK,
        message : "Wallet get Successfull",
        data : wallet
       })
})

const myTransaction = catchAsync(async (req:Request , res: Response , next: NextFunction) => {

    const decodedUser = req.user

        const getTransaction = await WalletServices.myTransaction(decodedUser as JwtPayload)

        Sendresponse(res ,{
        success : true,
        statuscode : httpStatus.OK,
        message : "Transaction get Successfull",
        data : getTransaction
       })
})

 export const WalletController = {
    UserAddMoney,
    UserSendMoney,
    UsercashOut,
    myTransaction,
    myWallet
 } 