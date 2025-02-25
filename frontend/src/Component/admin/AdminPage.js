import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../menu/Menu';
import CategoryList from './category/CategoryList';
import ProductList from './product/ProductList';
import AdminOrderList from './order/AdminOrderList';

import './AdminPage.css';

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
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

  useEffect(() => {
    // Cập nhật selectedMenu từ hash trong URL
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        setSelectedMenu(hash);
    }
  }, []);

  useEffect(() => {
      // Cập nhật hash trong URL khi selectedMenu thay đổi
      if (selectedMenu) {
          window.location.hash = selectedMenu;
      }
  }, [selectedMenu]);

  const selectCategoryList = () => {
    setSelectedMenu('CategoryList');
  };

  const selectProductList = () => {
    setSelectedMenu('ProductList');

  };

  const selectAdminOrderList = () => {
    setSelectedMenu('AdminOrderList');

  };

  return (
    <div className="admin-container">
      {/* Phần Menu */}
      {/* <Menu /> */}
      <ul className="admin-menu">
        <div className='admin-menu-logo'>
          Admin
        </div>
        <li 
          className={selectedMenu === 'CategoryList' ? 'active' : ''} 
          onClick={() => selectCategoryList('CategoryList')} 
          style={{ cursor: 'pointer' }}
        >
            Quản lí danh mục
        </li>
        <li  
          className={selectedMenu === 'ProductList' ? 'active' : ''} 
          onClick={() => selectProductList('ProductList')} 
          style={{ cursor: 'pointer' }}
        >
            Quản lí cửa hàng
        </li>

        <li  
          className={selectedMenu === 'AdminOrderList' ? 'active' : ''} 
          onClick={() => selectAdminOrderList('AdminOrderList')} 
          style={{ cursor: 'pointer' }}
        >
            Quản lí đơn hàng
        </li>
        <li onClick={handleLogout}>
          Đăng Xuất
        </li>
      </ul>
      <div className="admin-content">
                {selectedMenu === 'CategoryList' ? (
                    <>
                      <CategoryList />
                    </>
                ) : 
                selectedMenu === 'ProductList' ? (
                    <>
                      <ProductList />
                    </>
                ) : 
                selectedMenu === 'AdminOrderList' ? (
                  <>
                    <AdminOrderList />
                  </>
                ) : (
                    <>
                      <h1>Trang Chủ</h1>
                      <p>Chào mừng bạn đến với trang admin của chúng tôi!</p>
                    </>
                )}
            </div>

      {/* <CategoryList /> */}
      {/* <ProductList /> */}

    </div>
  );
};

export default AdminPage;
