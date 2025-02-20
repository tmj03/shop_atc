// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password);
      setMessage('Đăng ký thành công! Vui lòng đăng nhập.');
    } catch (err) {
      setMessage('Đăng ký không thành công. Vui lòng thử lại.');
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="submit">Đăng Ký</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
