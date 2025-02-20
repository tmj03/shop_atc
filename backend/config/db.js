const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;  // Lấy URI từ biến môi trường
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined'); 
    }
    // Kết nối MongoDB 
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);  // Dừng ứng dụng nếu có lỗi
  }
};

module.exports = connectDB;
