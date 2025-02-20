// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);

      if (data && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user)); // Lưu user vào localStorage
        setMessage('Đăng nhập thành công!');
        if (data.user.role === 'admin') {
          navigate('/adminPage'); // Chuyển hướng admin đến trang admin
        } else {
          navigate('/'); // Chuyển hướng user đến trang home
        }
      }
    } catch (err) {
      setMessage('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng Nhập</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
