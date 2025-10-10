import { Iuser } from "../User/user.interface"
import { User } from "../User/user.model";
import bcrypt from "bcryptjs";

const UserLogin = async (payload: Partial<Iuser>) => {

     const { phone , password } = payload;

     console.log(phone, password);

     const userAccount = await User.findOne({ phone });

     if(!userAccount){ 
         throw new Error("User not found");
     }
     
     const isPasswordMatch = await bcrypt.compare(password as string , userAccount.password as string);

     if(!isPasswordMatch){
         throw new Error("Invalid password");
     }

     const { password: userPassword, ...user } = userAccount.toObject();

     return user;
}

export const AuthServices = {
    UserLogin
}