import { Iuser } from "../User/user.interface"
import { User } from "../User/user.model";
import bcrypt from "bcryptjs";
import { UserAccessToken } from "../utils/useraccesstoken";
import { JwtPayload } from "jsonwebtoken";
import { envVariables } from "../../config/env";

const UserLogin = async (payload: Partial<Iuser>) => {

     const { phone , password } = payload;

     console.log(phone, password);

     const userAccount = await User.findOne({ phone });

     if(!userAccount){ 
         throw new Error("User not found");
     }

     const usertoken = UserAccessToken(userAccount);
     
     const isPasswordMatch = await bcrypt.compare(password as string , userAccount.password as string);

     if(!isPasswordMatch){
         throw new Error("Invalid password");
     }

     const { password: userPassword, ...user } = userAccount.toObject();

     return {
        accessToken : usertoken.accessToken,
        refreshToken : usertoken.refreshToken,
        User : user
     }
}

const userResetPassword = async (oldPassword : string , newPassword : string ,decodedUser : JwtPayload ) => {

    const user = await User.findById(decodedUser.userId);

    if (!user) {
        throw new Error("User not found from UserResetPassword");
    }

    const isMatch = bcrypt.compare(oldPassword, user.password as string )

    if(!isMatch){
        throw new Error("Old password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword , Number(envVariables.BCRYPT_SALT_ROUNDS))

    await user.save()
    
    return {
       success: true,
       message: "Password reset successful"
   };
}

export const AuthServices = {
    UserLogin,
    userResetPassword
}