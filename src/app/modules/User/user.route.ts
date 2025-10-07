
import express from 'express';
import { UserController } from './user.controller';


 const router = express.Router();

router.post('/create', UserController.Createuserwithwallet);
router.get('/allUsers', UserController.getAllusers);
router.get('/:id', UserController.getSingleuser);


export const UserRoute = router;