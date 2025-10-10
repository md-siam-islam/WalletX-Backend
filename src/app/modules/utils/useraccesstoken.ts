import { Iuser } from "../User/user.interface";
import { createToken } from './jwt';
import { envVariables } from '../../config/env';


export const UserAccessToken = (user : Partial<Iuser>) => {

    const JwtPayload = {
        userId: user._id,
        name : user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        walletId:user.walletId,
        walletBalance: user.walletBalance
    }

    const useraccessToken =  createToken(JwtPayload , envVariables.JWT_SECRET , envVariables.JWT_ACCESS_TOKEN_EXPIRE);

    const userrefToken =  createToken(JwtPayload , envVariables.JWT_SECRET , envVariables.JWT_ACCESS_TOKEN_EXPIRE);



    return {
        accessToken : useraccessToken,
        refreshToken : userrefToken
    };
}
