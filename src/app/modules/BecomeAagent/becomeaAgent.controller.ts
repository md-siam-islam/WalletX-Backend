import httpStatus from 'http-status-codes';

import { catchAsync } from "../utils/cathasync"
import { NextFunction, Request, Response } from "express";
import { becomeaAgentServices } from "./becomeaAgent.services";
import { JwtPayload } from "jsonwebtoken";
import { Sendresponse } from "../utils/sendResponsive";

const ApplyAgent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedUser = req.user;

    const application = await becomeaAgentServices.ApplyAgentServices(decodedUser as JwtPayload);

    Sendresponse(res, {
        success: true,
        statuscode: httpStatus.OK,
        message: "Become a Agent Request Successfull",
        data: application
    })

})

const GetAllApplyAgent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const getall = await becomeaAgentServices.GetAllaplication()
    
      Sendresponse(res, {
        success: true,
        statuscode: httpStatus.OK,
        message: "All aplication get Successfull",
        data: getall
    })

})

export const becomeaAgentController = {
    ApplyAgent,
    GetAllApplyAgent

}