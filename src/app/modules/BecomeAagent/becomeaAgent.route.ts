import express from "express"
import { becomeaAgentController } from "./becomeaAgent.controller"
import { checkAuth } from "../../../middlewares/checkAuth"
import { UserRole } from "../User/user.interface"

const router = express.Router()

router.post("/apply-agent" ,checkAuth(...Object.values(UserRole)) , becomeaAgentController.ApplyAgent)

export const becomeaAgentRoute = router