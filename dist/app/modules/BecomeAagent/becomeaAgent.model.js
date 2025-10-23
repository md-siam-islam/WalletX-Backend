"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentApplication = exports.AgentSchema = void 0;
const mongoose_1 = require("mongoose");
const becomeaAgent_interface_1 = require("./becomeaAgent.interface");
exports.AgentSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    address: { type: String },
    district: { type: String },
    status: { type: String, enum: Object.values(becomeaAgent_interface_1.AgentStatus), default: becomeaAgent_interface_1.AgentStatus.PENDING }
}, {
    timestamps: true,
    versionKey: false
});
exports.AgentApplication = (0, mongoose_1.model)("AgentApplication", exports.AgentSchema);
