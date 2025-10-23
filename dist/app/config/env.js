"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariables = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envLoad = () => {
    const requiredEnv = [
        'PORT',
        'DB_URL',
        'BCRYPT_SALT_ROUNDS',
        'JWT_SECRET',
        'JWT_ACCESS_TOKEN_EXPIRE',
        "ADMIN_PHONE",
        "ADMIN_EMAIL",
        "ADMIN_PASSWORD",
        "NODE_ENV",
        "FRONTEND_URL"
    ];
    requiredEnv.forEach((env) => {
        if (!process.env[env]) {
            throw new Error(`Missing required environment variable: ${env}`);
        }
    });
    return {
        PORT: process.env.PORT,
        DB_URL: process.env.DB_URL,
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_ACCESS_TOKEN_EXPIRE: process.env.JWT_ACCESS_TOKEN_EXPIRE,
        ADMIN_PHONE: process.env.ADMIN_PHONE,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        NODE_ENV: process.env.NODE_ENV,
        FRONTEND_URL: process.env.FRONTEND_URL,
    };
};
exports.envVariables = envLoad();
