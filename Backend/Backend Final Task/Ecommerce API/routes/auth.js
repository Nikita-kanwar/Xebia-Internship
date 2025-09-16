const express = require('express');
const { signup, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 chars long'),
  ],
  signup
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('enter a valid email'),
    body('password').notEmpty().withMessage('password is required'),
  ],
  login
);

module.exports = router;
