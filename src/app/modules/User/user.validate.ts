 import z from "zod";

 import { UserRole, UserStatus } from "./user.interface";

 export const CreateUserZodSchema = z.object({

    name: z
    .string({ message: "Name must be a string" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),

    email: z
    .string({ message: "Email must be a string" })
    .email("Invalid email format"),
    phone: z
    .string({ message: "Phone number must be a string" })
    .regex(/^(\+8801|8801|01)[3-9]\d{8}$/, {
      message: "Phone number must be a valid Bangladeshi number",
    }).min(11, { message: "Phone number must be at least 11 characters" }),

    password: z
    .string({ message: "Password must be a string" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),

    address: z.string().optional(),
    picture: z.string().optional(),
    role: z.enum([UserRole.ADMIN, UserRole.AGENT, UserRole.USER]).default(UserRole.USER),
    isActive: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.PENDING, UserStatus.SUSPENDED]).default(UserStatus.ACTIVE),
    isVerified: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
    walletId: z.string().optional(),
    walletBalance: z.number().min(0).optional()
 })
 export const UpdateUserZodSchema = z.object({

    name: z
    .string({ message: "Name must be a string" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be at most 50 characters" }).optional(),

    email: z
    .string({ message: "Email must be a string" })
    .email("Invalid email format").optional(),

    password: z
    .string({ message: "Password must be a string" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be at most 100 characters" }).optional(),

    address: z.string().optional(),
    picture: z.string().optional(),
 })