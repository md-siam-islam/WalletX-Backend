import { User } from './user.model';
import { Iuser } from "./user.interface"
import { Wallet } from '../Wallet/wallet.model';


const  Createuser = async(payload : Iuser) => {

    const session = await User.startSession();
    session.startTransaction();
    // create user logic here
    try {
        console.log("Creating user with payload:", payload);

        const {name , phone , password , email} = payload;

        const phoneExists = await User.findOne({phone});

        if(phoneExists){
            throw new Error("Phone number already exists");
        }
        const emailExists = await User.findOne({email});

        if(emailExists){
            throw new Error("Email already exists");
        }

        const user = await User.create([{name , phone , password , email}] , {session});

        const wallet = await Wallet.create([{userId : user[0]._id}] , {session});

        await session.commitTransaction();
        session.endSession();

        return {
            user,
            wallet
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
       
    
}

 
export const UserService = {
    Createuser
}