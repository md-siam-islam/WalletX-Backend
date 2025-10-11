import { Types } from "mongoose";

    export enum UserRole {
        ADMIN = 'admin',
        AGENT = 'agent',
        USER = 'user'
    }
export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
    SUSPENDED = 'suspended'
}

export interface Iuser {
     _id :Types.ObjectId;
    name: string,
    email?: string,
    phone: string,
    password: string,
    address?: string,
    picture?: string,
    role?: UserRole,
    isActive?: UserStatus,
    isVerified?: boolean,
    isDeleted?: boolean,
    walletId?: Types.ObjectId[],
    balance?: number,
}