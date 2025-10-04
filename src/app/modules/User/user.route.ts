
import express from 'express';
import { UserController } from './user.controller';


 const router = express.Router();

router.post('/create', UserController.Createuserwithwallet);


export const UserRoute = router;