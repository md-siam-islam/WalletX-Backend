import { User } from './user.model';
import { Iuser } from "./user.interface"


const  Createuser = async(payload : Iuser) => {
    // create user logic here
    const {name , phone , password} = payload;

    const phoneExists = await User.findOne({phone});

    if(phoneExists){
        throw new Error("Phone number already exists");
    }

    const user = await User.create({name , phone , password});

    return user;
}

 
export const UserService = {
    Createuser
}