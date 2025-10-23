import express from "express"
import { WalletController } from "./wallet.controller"
import { checkAuth } from "../../../middlewares/checkAuth"
import { UserRole } from "../User/user.interface"

const router = express.Router()

router.post("/add-money" , checkAuth(UserRole.USER), WalletController.UserAddMoney)
// send money sudu user korte parbe 
router.post("/send-money" ,checkAuth(UserRole.USER , UserRole.ADMIN), WalletController.UserSendMoney)
// User cashOut 
router.post("/cash-out" , checkAuth(UserRole.USER, UserRole.ADMIN) , WalletController.UsercashOut)

router.get("/me" , checkAuth(...Object.values(UserRole)) , WalletController.myWallet)

router.get("/transaction" , checkAuth(...Object.values(UserRole)) , WalletController.myTransaction)


// cash in agent 

router.post("/agent/cash-in" ,checkAuth(UserRole.AGENT) , WalletController.CashinUserAccount )

export const WalletRouter = router