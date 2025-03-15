import express from 'express';
import AuthController from '../controller/auth_controller.js';
const routerAuth = express.Router();

routerAuth.post('/signup',AuthController.signup);
routerAuth.post('/login',AuthController.login);
routerAuth.post('/google',AuthController.google);
export default routerAuth;