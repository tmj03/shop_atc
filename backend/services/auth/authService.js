// services/userService.js
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// Đăng ký
const register = async (username, email, password) => {
    // Kiểm tra xem người dùng đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
        throw new Error('User already exists');
    }

    // Tạo người dùng mới
    user = new User({
        username,
        email,
        password,
        role: 'user', // vai trò mặc định
    });

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return user;
};

// Đăng nhập
const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User does not exist');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return user;
};

// Đăng xuất
const logout = (session) => {
    return new Promise((resolve, reject) => {
        session.destroy((err) => {
            if (err) {
                reject('Error during logout');
            }
            resolve();
        });
    });
};

module.exports = {
    register,
    login,
    logout,
};
