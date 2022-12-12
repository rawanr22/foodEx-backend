const { check } = require('express-validator');

module.exports.valdiatePostSupplier = () => {
  const validationMiddlewares = [
    check('username').notEmpty().withMessage('Username cannot be empty.'),
    check('email').isEmail().withMessage('The email is invalid.'),
    check('address').notEmpty().withMessage('Address cannot be empty.'),
    check('password').isLength({ min: 8 }).withMessage('Password has to be more than 8 characters long.'),
    check('phoneNumber').isLength({ min: 11}).withMessage('Please enter a correct number.')
  ];
  return validationMiddlewares;
};
