import { JwtPayload } from "jsonwebtoken";
import { AgentStatus, IAgentApplication } from "./becomeaAgent.interface"
import { AgentApplication } from "./becomeaAgent.model";
import { UserRole } from "../User/user.interface";
import { User } from "../User/user.model";
import { application } from "express";


const ApplyAgentServices = async (decodedUser : JwtPayload) => {

    const user = await User.findOne({_id : decodedUser.userId});

    if(!user){
        throw new Error("User not found");
    }

    if(decodedUser.role === UserRole.AGENT){
        throw new Error("You are already an agent");
    }

    const applicationPayload: IAgentApplication = {
        userId: decodedUser.userId,
        fullName : user.name,
        email : user.email,
        phone : user.phone,
        address : user.address,
        status: AgentStatus.PENDING
    };

    const application = await AgentApplication.create(applicationPayload);
    return application;
}


const GetAllaplication = async () => {

    const aplication = await AgentApplication.find({})

    const totalAplication = await AgentApplication.countDocuments()

    return {
        data : aplication,
        meta : {
            total : totalAplication
        }
    }
}

export const becomeaAgentServices = {
    ApplyAgentServices ,
    GetAllaplication
}