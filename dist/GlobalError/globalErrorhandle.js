"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    console.log("Global Error Handler:", err);
    if (err instanceof zod_1.ZodError || (err === null || err === void 0 ? void 0 : err.name) === "ZodError") {
        const messages = err.message.map((err) => err.message).join(", ");
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
        message: `Somthing went wrong 🤦‍♂️🤦‍♂️ ${err.message} .`,
    });
};
exports.globalErrorHandler = globalErrorHandler;
