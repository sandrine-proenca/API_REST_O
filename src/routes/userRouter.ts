import express = require('express');
import { UserController } from '../controllers/userController';


export const userRouter = express.Router();

/**
 * appel de la Class UserController
 */
const userController = new UserController();


/**
 * création d'un nouveau user avec hachage du password dans la BDD
 */
userRouter.post('/register', userController.register);


/**
 * vérification du user dans la BDD
 */
userRouter.post('/login', userController.login);