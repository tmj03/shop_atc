import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../menu/Menu';
import CategoryList from './category/CategoryList';
import ProductList from './product/ProductList';

import './AdminPage.css';

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

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

  return (
    <div className="admin-container">
      {/* Phần Menu */}
      <Menu />
      <ul className="admin-menu">
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
