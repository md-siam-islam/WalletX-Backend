import { model, Schema } from "mongoose";
import { Iuser, UserRole, UserStatus } from "./user.interface";


const userSchema = new Schema<Iuser>({

    name: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    picture: { type: String, required: false },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    isActive: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE },
    isVerified: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    // wallet: { type: mongo.Types.ObjectId, ref: 'Wallet' },
    // transactions: [{ type: mongo.Types.ObjectId, ref: 'Transaction' }]
},{
    timestamps : true,
    versionKey : false
});

export const User = model<Iuser>('User', userSchema);