import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";


const Createuserwithwallet = async (req: Request, res: Response , next: NextFunction) => {

    try {

        const user = await UserService.Createuser(req.body);

        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const UserController = {
    Createuserwithwallet
}