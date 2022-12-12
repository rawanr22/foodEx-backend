const { Router } = require('express');

const authController = require('../controllers/auth');

const authRouter = Router();

authRouter.post('/signup', authController.postUser);

authRouter.post('/signin', authController.postLogin);

module.exports = authRouter;
