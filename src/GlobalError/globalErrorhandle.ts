import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err.statusCode) {
        return res.status(err.statusCode).json({success: false, message: err.message });
    }

    res.status(500).json({ success: false, message: 'Something went wrong!🤦‍♂️🤦‍♂️😁' });
} 