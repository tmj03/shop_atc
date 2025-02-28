// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import './Login.css'; // Đảm bảo import file CSS
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Thêm state để phân biệt thông báo thành công và lỗi
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);

      if (data && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user)); // Lưu user vào localStorage
        setMessage('Đăng nhập thành công!');
        setMessageType('success'); // Thông báo thành công
        if (data.user.role === 'admin') {
          navigate('/adminPage'); // Chuyển hướng admin đến trang admin
        } else {
          navigate('/'); // Chuyển hướng user đến trang home
        }
      }
    } catch (err) {
      setMessage('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      setMessageType('error'); // Thông báo lỗi
    }
  };

  return (
    <div className="login">
      <h2 className="login__title">Đăng Nhập</h2>
      <form className="login__form" onSubmit={handleLogin}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Chưa có tài khoản? <Link to="/signup" className="login__signup-link--text">Đăng ký</Link></p>
        <button className="login__button" type="submit">Đăng Nhập</button>
      </form>
      {message && (
        <p className={`login__message login__message--${messageType}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
