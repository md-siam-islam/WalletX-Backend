"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_interface_1 = require("../User/user.interface");
const checkAuth_1 = require("../../../middlewares/checkAuth");
const router = express_1.default.Router();
router.post("/login", auth_controller_1.AuthController.Userlogin);
router.post("/logout", auth_controller_1.AuthController.userLogout);
router.post("/resetPassword", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), auth_controller_1.AuthController.ResetPassword);
exports.AuthRoutes = router;
