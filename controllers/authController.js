const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const JWTSecretKey = process.env.JWT_TOKEN;

const createJWT = (userId) => {
  return jwt.sign({ userId }, JWTSecretKey, { expiresIn: '30d' });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ newUser, token: createJWT(newUser._id) });
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found!' });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (validPassword) {
      return res.status(200).json({ user, token: createJWT(user._id) });
    } else {
      return res.status(403).json('Invalid password!');
    }
  } catch (error) {
    console.log('error', error);
    return res.status(400).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const { _id, username, email } = await User.findById(req.user.id);
    res.status(200).json({
      id: _id,
      username,
      email,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  login,
  register,
  getUsers,
};
