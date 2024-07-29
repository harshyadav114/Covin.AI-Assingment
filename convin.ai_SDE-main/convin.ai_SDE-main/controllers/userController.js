const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = userService.generateToken(user._id);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log(user._id,"user")
    const token = userService.generateToken(user._id);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get user profile', error: error.message });
  }
};