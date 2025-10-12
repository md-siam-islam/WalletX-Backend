import express from "express"
import { WalletController } from "./wallet.controller"
import { checkAuth } from "../../../middlewares/checkAuth"
import { UserRole } from "../User/user.interface"

const router = express.Router()

router.post("/add-money" ,checkAuth(...Object.values(UserRole)), WalletController.UserAddMoney)
router.post("/send-money" ,checkAuth(...Object.values(UserRole)), WalletController.UserSendMoney)

export const WalletRouter = router