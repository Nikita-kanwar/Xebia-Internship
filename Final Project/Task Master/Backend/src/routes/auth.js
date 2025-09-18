const express = require('express');
const { check } = require('express-validator');
const { signup, login, profile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/signup',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Valid email required').isEmail(),
    check('password', 'Password must be at least 6 chars').isLength({ min: 6 }),
  ],
  signup
);

router.post(
  '/login',
  [check('email', 'Valid email required').isEmail(), check('password', 'Password required').exists()],
  login
);

router.get('/profile', authMiddleware, profile);

module.exports = router;
