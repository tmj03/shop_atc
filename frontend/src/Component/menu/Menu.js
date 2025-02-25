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
    localStorage.removeItem("user");  // Xóa thông tin user
    localStorage.removeItem("token"); // Xóa token để ngăn truy cập API
    setUser(null);
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };


  return (
    <div className="menu-main">
      {user ? (
        <div className="menu-main__user-info">
          <p className="menu-main__welcome-message">Chào mừng, {user.username}!</p>
          <button className="menu-main__logout-button" onClick={handleLogout}>Đăng Xuất</button>
        </div>
      ) : (
        <div className="menu-main__auth-links">
          <Link className="menu-main__link" to="/login">Đăng Nhập</Link>
          <br />
          <Link className="menu-main__link" to="/signup">Đăng Ký</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
