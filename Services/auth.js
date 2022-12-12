const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const UserModel = require('../models/User');

module.exports.createUser = async (userInfo, userCoords) => {
  try {
    let hashedPassword = await bcrypt.hash(userInfo.password, 12);

    const newUser = new UserModel({
      username: userInfo.username,
      password: hashedPassword,
      name: userInfo.name,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      address: userInfo.address,
      location: {
        lat: userCoords.lat,
        lng: userCoords.lon
      },
      gender: userInfo.gender,
      age: userInfo.age,
    });

    await newUser.save();
  } catch (err) {
    throw new Error('Error creating new user, please try again later.');
  }
};

module.exports.doesUserExist = async (username) => {
  const existingUser = await UserModel.findOne({
    username: username
  });

  if (existingUser) {
    return true;
  } else {
    return false;
  }
};

module.exports.checkCredentials = async (username, password) => {
  try {
    const user = await UserModel.findOne({
      username: username
    });

    let isCorrectPassword = bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Error logging in, please try again later.');
  }
};

module.exports.generateJWT = (user) => {
  const jwtPayload = {
    userId: user._id,
    username: user.username
  };

  const jwtSecret = process.env.JWT_SECRET;

  try {
    let token = JWT.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error('Failure to sign in, please try again later.');
  }
};

module.exports.auth = async (token) => {
  try {
    const tokenPayload = await JWT.verify(token, process.env.JWT_SECRET);
    return tokenPayload;
  } catch (error) {
    throw new Error('Unauthrozied.');
  }
};
