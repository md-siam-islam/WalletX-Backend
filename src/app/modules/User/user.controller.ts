import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";


const Createuserwithwallet = async (req: Request, res: Response , next: NextFunction) => {

    try {

        const user = await UserService.Createuser(req.body);

        res.status(200).json({
            success: true,
            message: "User created successfully and wallet created successfully",
            data: user
        });


    } catch (error) {
        next(error);
    }
}

const getAllusers = async (req: Request, res: Response , next: NextFunction) => {

    try {

        const allusers = await UserService.getAllusers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: allusers
        });
    } catch (error) {
        next(error);
    }
}

    

export const UserController = {
    Createuserwithwallet,
    getAllusers
}