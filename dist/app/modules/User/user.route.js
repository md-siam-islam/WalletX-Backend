"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const uservalidate_1 = require("../../../middlewares/uservalidate");
const user_validate_1 = require("./user.validate");
const checkAuth_1 = require("../../../middlewares/checkAuth");
const user_interface_1 = require("./user.interface");
const router = express_1.default.Router();
router.post('/create', (0, uservalidate_1.userValidate)(user_validate_1.CreateUserZodSchema), user_controller_1.UserController.Createuserwithwallet);
router.get('/allUsers', (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), user_controller_1.UserController.getAllusers);
router.patch('/:id', (0, uservalidate_1.userValidate)(user_validate_1.UpdateUserZodSchema), (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), user_controller_1.UserController.updateUser);
router.get('/:id', user_controller_1.UserController.getSingleuser);
exports.UserRoute = router;
