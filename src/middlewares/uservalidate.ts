import { ZodObject, ZodRawShape } from "zod";
import { NextFunction, Request, Response } from "express";

export const userValidate = (zodValidate: ZodObject<ZodRawShape>) => async (req: Request, res: Response, next: NextFunction) => {

    try {

        const parseData = await zodValidate.parseAsync(req.body);
        req.body = parseData;
        next();
        
    } catch (error) {
        next(error);
        res.status(400).json({
            status: "fail",
            message: "Validation error",
            error: error,
        });
    }
}