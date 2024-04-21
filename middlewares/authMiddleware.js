const jwt = require('jsonwebtoken');

const User = require('../models/User');

const dotenv = require('dotenv');
dotenv.config();

const authorizationControl = async (req, res, next) => {
  let cryptedToken;
  const key = process.env.JWT_TOKEN;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      cryptedToken = req.headers.authorization.split(' ')[1];
      const token = jwt.verify(cryptedToken, key);
      req.user = await User.findById(token.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Giriş yapılamaz');
    }
  }

  if (!cryptedToken) {
    res.status(401);
    throw new Error('Giriş yapılamaz, token bulunamadı');
  }
};

module.exports = { authorizationControl };
