"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRouter = void 0;
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = require("./wallet.controller");
const checkAuth_1 = require("../../../middlewares/checkAuth");
const user_interface_1 = require("../User/user.interface");
const router = express_1.default.Router();
router.post("/add-money", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.USER), wallet_controller_1.WalletController.UserAddMoney);
// send money sudu user korte parbe 
router.post("/send-money", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.USER, user_interface_1.UserRole.ADMIN), wallet_controller_1.WalletController.UserSendMoney);
// User cashOut 
router.post("/cash-out", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.USER, user_interface_1.UserRole.ADMIN), wallet_controller_1.WalletController.UsercashOut);
router.get("/me", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), wallet_controller_1.WalletController.myWallet);
router.get("/transaction", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), wallet_controller_1.WalletController.myTransaction);
// cash in agent 
router.post("/agent/cash-in", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.AGENT), wallet_controller_1.WalletController.CashinUserAccount);
exports.WalletRouter = router;
