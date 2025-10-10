import { User } from './user.model';
import { Iuser } from "./user.interface"
import { Wallet } from '../Wallet/wallet.model';
import bcrypt from "bcryptjs";
import { envVariables } from '../../config/env';


const  Createuser = async(payload : Iuser) => {

    const session = await User.startSession();
    session.startTransaction();
    // create user logic here
    try {

        const {name , phone , password , email} = payload;

        const phoneExists = await User.findOne({phone});

        if(phoneExists){
            throw new Error("Phone number already exists");
        }

        const emailExists = await User.findOne({email});

        if(emailExists){
            throw new Error("Email already exists");
        }

        const HassPassword = await bcrypt.hash(password as string , Number(envVariables.BCRYPT_SALT_ROUNDS));


        const user = await User.create([{name , phone , password:HassPassword , email}] , {session});

        const wallet = await Wallet.create([{userId : user[0]._id}] , {session});

        const updateuser = await User.findByIdAndUpdate(user[0]._id , { walletId: wallet[0]._id , walletBalance: wallet[0].balance }, { new: true, session })

        await session.commitTransaction();
        session.endSession();

        return {
            User : updateuser,
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
       
    
}

const getAllusers = async() => {

    const users = await User.find({});

    const totalUser = await User.countDocuments();


    return {
        data : users,
        meta : {
            total : totalUser
        }
    }
        
}
 
const getSingleuser = async(id : string) => {

    if(!id){
        throw new Error("User id is required");
    }

    const user = await User.findById(id);

    if(!user){
        throw new Error("User not found");
    }

    return user;
}

const updateUser = async( id : string , payload: Partial<Iuser>) => {

    if(!id){
        throw new Error("User id is required");
    }

    const user = await User.findById(id);

    if(!user){
        throw new Error("User not found");
    }   

    const updatedUser = await User.findByIdAndUpdate(id , payload , {new : true , runValidators : true});

    return updatedUser;

}
export const UserService = {
    Createuser,
    getAllusers,
    getSingleuser,
    updateUser
}