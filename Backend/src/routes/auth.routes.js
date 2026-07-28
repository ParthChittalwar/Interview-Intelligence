const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post('/register',authController.RegisterUserController)

authRouter.post('/login',authController.LoginUserController)

authRouter.get('/logout',authController.LogOutUserController)

authRouter.get('/getme',authMiddleware.authUser,authController.getmeController)

module.exports = authRouter