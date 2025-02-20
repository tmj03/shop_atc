import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../menu/Menu';
import CategoryList from './category/CategoryList';
import ProductList from './product/ProductList';



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

  return (
    <div className='home'>
      {/* Phần Menu */}
      <Menu />
      <h1>Trang Chủ</h1>
      <p>Chào mừng bạn đến với trang admin của chúng tôi!</p>
      <CategoryList />
      <ProductList />

    </div>
  );
};

export default AdminPage;
