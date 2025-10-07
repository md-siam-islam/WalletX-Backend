
import express from 'express';
import { UserController } from './user.controller';
import { userValidate } from '../../../middlewares/uservalidate';
import { CreateUserZodSchema } from './user.validate';


 const router = express.Router();

router.post('/create', userValidate(CreateUserZodSchema), UserController.Createuserwithwallet);
router.get('/allUsers', UserController.getAllusers);
router.get('/:id', UserController.getSingleuser);


export const UserRoute = router;