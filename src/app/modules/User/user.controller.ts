import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import { catchAsync } from "../utils/cathasync";
import { Sendresponse } from "../utils/sendResponsive";
import  httpStatus  from 'http-status-codes';

const Createuserwithwallet = catchAsync(async (req: Request, res: Response , next: NextFunction) => {

    const user = await UserService.Createuser(req.body);

       Sendresponse(res ,{
        success : true,
        statuscode : httpStatus.OK,
        message : "User and wallet create done",
        data :user
       })
})


 const getAllusers = catchAsync(async (req: Request, res: Response , next: NextFunction) => {

    
        const allusers = await UserService.getAllusers();

        Sendresponse(res ,{
        success : true,
        statuscode : httpStatus.OK,
        message : "Users retrieved successfully",
        data :allusers
       })
        
 })


const getSingleuser = catchAsync(async (req: Request, res: Response , next: NextFunction) => {


        const user = await UserService.getSingleuser(req.params.id);

          Sendresponse(res ,{
        success : true,
        statuscode : httpStatus.OK,
        message : "User retrieved successfully",
        data :user
       })
        

})

const updateUser = catchAsync(async (req: Request, res: Response , next: NextFunction) => {

        const {id} = req.params;

        const payload = req.body;

        const updateUser = await UserService.updateUser(id , payload);

           Sendresponse(res ,{
        success : true,
        statuscode : httpStatus.OK,
        message : "User Update successfully",
        data :updateUser
       })
  
            
    });
    

export const UserController = {
    Createuserwithwallet,
    getAllusers,    
    getSingleuser,
    updateUser
}