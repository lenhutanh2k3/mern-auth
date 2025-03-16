import express from 'express';
import UserController from '../controller/user_controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const routerUser = express.Router();

routerUser.get('/',UserController.checkUser);
routerUser.put("/:id",verifyToken, UserController.updateUser);
export default routerUser;