// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../../services/authService';
import './Register.css'; // Đảm bảo import file CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Thêm state để phân biệt thông báo thành công và lỗi

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password);
      setMessage('Đăng ký thành công! Vui lòng đăng nhập.');
      setMessageType('success'); // Thông báo thành công
    } catch (err) {
      setMessage('Đăng ký không thành công. Vui lòng thử lại.');
      setMessageType('error'); // Thông báo lỗi
    }
  };

  return (
    <div className="register">
      <h2 className="register__title">Đăng Ký</h2>
      <form className="register__form" onSubmit={handleRegister}>
        <input
          className="register__input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="register__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register__button" type="submit">Đăng Ký</button>
      </form>
      {message && (
        <p className={`register__message register__message--${messageType}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
