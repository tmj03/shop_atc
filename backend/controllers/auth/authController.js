// controllers/userController.js
const { validationResult } = require('express-validator');
const userService = require('../../services/auth/authService');
const jwt = require('jsonwebtoken');

// Đăng ký
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error' });  // Thêm return để dừng hàm
    }

    const { username, email, password } = req.body;

    try {
        const user = await userService.register(username, email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Error during registration:', err);  
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Đăng nhập
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Đăng nhập với email:", email);

    try {
        const user = await userService.login(email, password);
        
        if (!user) {  // Kiểm tra nếu user không tồn tại
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("Người dùng tìm thấy:", user);

        // Tạo token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Lưu thông tin vào session
        req.session.user = {
            id: user.id,
            role: user.role,
            username: user.username,
        };

        res.status(200).json({ message: 'Login successful', user: req.session.user, token });
    } catch (err) {
        console.error("Lỗi khi đăng nhập:", err.message);
        res.status(400).json({ message: err.message });
    }
};

// Đăng xuất
const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Lỗi khi đăng xuất:', err);
                return res.status(500).json({ message: 'Lỗi khi đăng xuất' });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error during logout' });
    }
};

module.exports = {
    register,
    login,
    logout
};
