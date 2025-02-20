import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Thay đổi với URL backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Yêu cầu đăng ký người dùng
export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post('/register', { username, email, password });
    return response.data;
  } catch (err) {
    throw new Error('Đăng ký không thành công.');
  }
};

// Yêu cầu đăng nhập người dùng
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
    }
    console.log(localStorage.getItem('token'));

    return response.data;
  } catch (err) {
    throw new Error('Đăng nhập không thành công.');
  }
};

// Yêu cầu đăng xuất người dùng
export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (err) {
    throw new Error('Đăng xuất không thành công.');
  }
};
