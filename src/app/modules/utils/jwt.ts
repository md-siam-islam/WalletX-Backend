import jwt ,{ JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (payload: JwtPayload, secret: string, expiresIn: string) => {

    const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
    return token;

};


export const verifyToken = (token: string , secret : string)=>{

    const verify = jwt.verify(token, secret)

    return verify
}