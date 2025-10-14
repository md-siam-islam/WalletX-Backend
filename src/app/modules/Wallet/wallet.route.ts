import express from "express"
import { WalletController } from "./wallet.controller"
import { checkAuth } from "../../../middlewares/checkAuth"
import { UserRole } from "../User/user.interface"

const router = express.Router()

router.post("/add-money" , checkAuth(UserRole.USER), WalletController.UserAddMoney)

// send money sudu user korte parbe 
router.post("/send-money" ,checkAuth(UserRole.USER), WalletController.UserSendMoney)

// User cashOut 

router.post("/cash-out" , checkAuth(UserRole.USER) , WalletController.UsercashOut)

export const WalletRouter = router