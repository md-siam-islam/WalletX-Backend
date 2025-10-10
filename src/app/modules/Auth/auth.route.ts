import express from "express"
import { AuthController } from "./auth.controller";

const router = express.Router()

router.post("/login", AuthController.Userlogin);
router.post("/logout", AuthController.userLogout)

export const AuthRoutes = router;
