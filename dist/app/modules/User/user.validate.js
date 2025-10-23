"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserZodSchema = exports.CreateUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.CreateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ message: "Name must be a string" })
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must be at most 50 characters" }),
    email: zod_1.default
        .string({ message: "Email must be a string" })
        .email("Invalid email format"),
    phone: zod_1.default
        .string({ message: "Phone number must be a string" })
        .regex(/^(\+8801|8801|01)[3-9]\d{8}$/, {
        message: "Phone number must be a valid Bangladeshi number",
    }).min(11, { message: "Phone number must be at least 11 characters" }),
    password: zod_1.default
        .string({ message: "Password must be a string" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(100, { message: "Password must be at most 100 characters" }),
    address: zod_1.default.string().optional(),
    picture: zod_1.default.string().optional(),
    role: zod_1.default.enum([user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.AGENT, user_interface_1.UserRole.USER]).default(user_interface_1.UserRole.USER),
    isActive: zod_1.default.enum([user_interface_1.UserStatus.ACTIVE, user_interface_1.UserStatus.INACTIVE, user_interface_1.UserStatus.PENDING, user_interface_1.UserStatus.SUSPENDED]).default(user_interface_1.UserStatus.ACTIVE),
    isVerified: zod_1.default.boolean().default(true),
    isDeleted: zod_1.default.boolean().default(false),
    walletId: zod_1.default.string().optional(),
    walletBalance: zod_1.default.number().min(0).optional()
});
exports.UpdateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ message: "Name must be a string" })
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must be at most 50 characters" }).optional(),
    email: zod_1.default
        .string({ message: "Email must be a string" })
        .email("Invalid email format").optional(),
    password: zod_1.default
        .string({ message: "Password must be a string" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(100, { message: "Password must be at most 100 characters" }).optional(),
    address: zod_1.default.string().optional(),
    picture: zod_1.default.string().optional(),
    phone: zod_1.default.string().optional(),
});
