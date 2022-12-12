const { validationResult } = require('express-validator');

const AuthService = require('../services/auth');
const azMapsService = require('../services/azMaps');

module.exports.postUser = async (req, res) => {
  try {

    const validationErrors = validationResult(req).array();

    if (validationErrors.length > 0) {
      const firstError = validationErrors[0];
      return res.status(422).send({
        error: firstError.msg
      });
    }

    const userInfo = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      gender: req.body.gender,
      age: req.body.age
    };
      const userCoords = await azMapsService.geocodeAddress(req.body.address);
      if (!userCoords) {
        return res.status(422).send({
          error: 'Could not find a valid location using the given address.'
        });
      }
      const addedUser = await AuthService.createUser(
        userInfo,
        userCoords
      );
  
      res.status(201).send({
        msg: 'User Registered successfully.',
        userId: addedUser._id
      });

    const userExists = await AuthService.doesUserExist(userInfo.username);
    if (userExists) {
      return res.status(422).send({
        error: 'A user with the same username already exists.'
      });
    }

    await AuthService.createUser(userInfo, userCoords);
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AuthService.checkCredentials(username, password);

    if (!user) {
      return res.status(401).send({
        error:
          'Invalid credentials, please enter the correct username and password.'
      });
    }

    const jwt = await AuthService.generateJWT(user);
    res.send({
      userId: user._id,
      username: user.username,
      jwt: jwt,
      message: 'Logged in successfully.'
    });
  } catch (err) {
    res.status(500).send({
      error: error.message
    });
  }
};
