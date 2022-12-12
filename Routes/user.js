const { Router } = require('express');

const userController = require('../controllers/user');

const userRouter = Router();

userRouter.post('/favRes', userController.favDish)

userRouter.post('/favDish', userController.favDish);

module.exports = userRouter;
