import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';


const Menu = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin user khỏi localStorage
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login'); // Chuyển hướng về trang login
  };

  return (
    <div className='menu-main'>
      {user ? (
        <div>
          <p>Chào mừng, {user.username}!</p>
          <button onClick={handleLogout}>Đăng Xuất</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Đăng Nhập</Link>
          <br />
          <Link to="/signup">Đăng Ký</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
