const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

exports.getUserById = async (userId) => {
  return await User.findById(userId).select('-password');
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};