import express from "express"
import { becomeaAgentController } from "./becomeaAgent.controller"
import { checkAuth } from "../../../middlewares/checkAuth"
import { UserRole, UserStatus } from "../User/user.interface"

const router = express.Router()

router.post("/apply-agent" ,checkAuth(...Object.values(UserRole)) , becomeaAgentController.ApplyAgent)
router.get("/all-aplication" , checkAuth(UserRole.ADMIN) , becomeaAgentController.GetAllApplyAgent)

export const becomeaAgentRoute = router