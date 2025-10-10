import express from "express"
import { AuthController } from "./auth.controller";
import { UserRole } from '../User/user.interface';
import { checkAuth } from "../../../middlewares/checkAuth";

const router = express.Router()

router.post("/login", AuthController.Userlogin);
router.post("/logout", AuthController.userLogout)
router.post("/resetPassword" ,checkAuth(...Object.values(UserRole)), AuthController.ResetPassword)

export const AuthRoutes = router;
