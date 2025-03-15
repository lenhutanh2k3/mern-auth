import express from 'express';
import UserController from '../controller/user_controller.js';
const routerUser = express.Router();

routerUser.get('/',UserController.checkUser);
export default routerUser;