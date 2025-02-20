// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/auth/authController');
const { body } = require('express-validator');

// Đăng ký
router.post(
    '/register',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ],
    userController.register
);

// Đăng nhập
router.post('/login', userController.login);

// Đăng xuất
router.post('/logout', userController.logout);

module.exports = router;
