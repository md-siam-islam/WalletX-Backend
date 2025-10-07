
import express from 'express';
import { UserController } from './user.controller';
import { userValidate } from '../../../middlewares/uservalidate';
import { CreateUserZodSchema, UpdateUserZodSchema } from './user.validate';


 const router = express.Router();

router.post('/create', userValidate(CreateUserZodSchema), UserController.Createuserwithwallet);
router.get('/allUsers', UserController.getAllusers);
router.patch('/:id', userValidate(UpdateUserZodSchema), UserController.updateUser);
router.get('/:id', UserController.getSingleuser);


export const UserRoute = router;