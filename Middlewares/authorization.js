const AuthService = require('../services/auth');

module.exports.auth = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error('Unauthorized.');
    }

    const tokenPayload = await AuthService.auth(token);

    req.jwtPayload = tokenPayload;
    
  } catch (err) {
    res.status(403).send({
      error: 'Unauthorized'
    });
  }
}

exports.adminCheck = asyncHandler(async (req, res, next) => {
  const { username } = req.user
  const adminUser = await User.findOne({ username })
  if (adminUser.role !== 'admin') {
    res.status(401)
    throw new Error('Not authorized as an admin')
  } else {
  }
  next();
})

