const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const validateRequest = require('../middleware/validateRequest');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('name').notEmpty(),
    body('mobile').notEmpty(),
    body('password').isLength({ min: 6 }),
  ],
  validateRequest,
  userController.registerUser
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validateRequest,
  userController.loginUser
);

router.get('/profile', auth, userController.getUserProfile);

module.exports = router;