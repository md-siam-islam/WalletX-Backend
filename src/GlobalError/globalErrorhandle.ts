import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Global Error Handler:", err);


  if (err instanceof ZodError || err?.name === "ZodError") {
    const messages = err.message.map((err: any) => err.message).join(", ");
    console.log("Zod Validation Error:", messages);
    
    return res.status(400).json({
      success: false,
      message: messages,
    });
  }


  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
     message : `Somthing went wrong 🤦‍♂️🤦‍♂️ ${err.message} .`,
  });

  
};