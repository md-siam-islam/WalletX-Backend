import { Types } from "mongoose";
import { envVariables } from "../../config/env"
import { User } from "../User/user.model";
import bcryptjs from "bcryptjs";
import { UserRole } from "../User/user.interface";
import { Wallet } from "../Wallet/wallet.model";

export const seedAdmin = async () => {

    try {
        const Admin_email = envVariables.ADMIN_EMAIL;
    const Admin_password = envVariables.ADMIN_PASSWORD;
    const saltRounds = Number(envVariables.BCRYPT_SALT_ROUNDS) || 10

    const existAdmin = await User.findOne({email : Admin_email})
    
    if(existAdmin){
    //   console.log("Admin already exists:", existAdmin.email);
      return;
    }

    const HassPassword = await bcryptjs.hash(Admin_password ,saltRounds)


    const payload = {
        _id : new Types.ObjectId(),
        name : "Siam Islam (Admin)",
        email: Admin_email,
        phone : "01951737358",
        password : HassPassword,
        role : UserRole.ADMIN
    }

    const admin = await User.create(payload)
    console.log("🎉 Admin create successfully:", admin.email);


    const Admin_Wallet = await Wallet.findOne({userId : admin._id})

    if(Admin_Wallet){
    console.log("Admin Wallet already exists:", Admin_Wallet.userId);
      return;
    }

    const Wallet_Payload = {
        userId : admin._id,
        name : admin.name,
        phone : admin.phone,
        balance : 500
    }

    const adminWallet = await Wallet.create(Wallet_Payload)
    console.log("🎉 Admin wallet create  successfully:" , adminWallet.phone);

    } catch (error) {
        console.error("❌ Error seeding admin:", error instanceof Error ? error.message : error);
    }

}