"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.becomeaAgentServices = void 0;
const becomeaAgent_interface_1 = require("./becomeaAgent.interface");
const becomeaAgent_model_1 = require("./becomeaAgent.model");
const user_interface_1 = require("../User/user.interface");
const user_model_1 = require("../User/user.model");
const ApplyAgentServices = (decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: decodedUser.userId });
    if (!user) {
        throw new Error("User not found");
    }
    if (decodedUser.role === user_interface_1.UserRole.AGENT) {
        throw new Error("You are already an agent");
    }
    const applicationPayload = {
        userId: decodedUser.userId,
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        status: becomeaAgent_interface_1.AgentStatus.PENDING
    };
    const application = yield becomeaAgent_model_1.AgentApplication.create(applicationPayload);
    return application;
});
const GetAllaplication = () => __awaiter(void 0, void 0, void 0, function* () {
    const aplication = yield becomeaAgent_model_1.AgentApplication.find({});
    const totalAplication = yield becomeaAgent_model_1.AgentApplication.countDocuments();
    return {
        data: aplication,
        meta: {
            total: totalAplication
        }
    };
});
exports.becomeaAgentServices = {
    ApplyAgentServices,
    GetAllaplication
};
