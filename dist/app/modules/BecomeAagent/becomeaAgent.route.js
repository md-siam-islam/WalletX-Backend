"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.becomeaAgentRoute = void 0;
const express_1 = __importDefault(require("express"));
const becomeaAgent_controller_1 = require("./becomeaAgent.controller");
const checkAuth_1 = require("../../../middlewares/checkAuth");
const user_interface_1 = require("../User/user.interface");
const router = express_1.default.Router();
router.post("/apply-agent", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), becomeaAgent_controller_1.becomeaAgentController.ApplyAgent);
router.get("/all-aplication", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), becomeaAgent_controller_1.becomeaAgentController.GetAllApplyAgent);
exports.becomeaAgentRoute = router;
