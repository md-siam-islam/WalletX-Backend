import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import { catchAsync } from "../utils/cathasync";


const Createuserwithwallet = catchAsync(async (req: Request, res: Response , next: NextFunction) => {

    const user = await UserService.Createuser(req.body);

        res.status(200).json({
            success: true,
            message: "User created successfully and wallet created successfully",
            data: user
        });
})


 const getAllusers = catchAsync(async (req: Request, res: Response , next: NextFunction) => {

    
        const allusers = await UserService.getAllusers();
        
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: allusers
        });
 })


const getSingleuser = catchAsync(async (req: Request, res: Response , next: NextFunction) => {


        const user = await UserService.getSingleuser(req.params.id);

        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user
        });
})

const updateUser = catchAsync(async (req: Request, res: Response , next: NextFunction) => {

        const {id} = req.params;

        const payload = req.body;

        const updateUser = await UserService.updateUser(id , payload);

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updateUser
        }); 
            
    });
    

export const UserController = {
    Createuserwithwallet,
    getAllusers,    
    getSingleuser,
    updateUser
}