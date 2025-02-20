const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth/authRoutes');
const categoryRoutes = require('./routes/category/categoryRoutes');
const productRoutes = require('./routes/product/productRoutes');
const cartRoutes = require('./routes/cart/cartRoutes');



const session = require('express-session');

dotenv.config();

const app = express();

// Cấu hình middleware
app.use(cors());
app.use(express.json());


// Cấu hình session
app.use(session({
    secret: 'your_secret_key', // Thay đổi thành khóa bảo mật của bạn
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Đặt true nếu bạn sử dụng HTTPS
}));

// Kết nối với MongoDB
connectDB();

// Sử dụng các routes
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);


console.log(process.env.MONGO_URI);

console.log(process.env.MONGO_URI); // Thêm dòng này để kiểm tra giá trị của MONGO_URI


module.exports = app;
