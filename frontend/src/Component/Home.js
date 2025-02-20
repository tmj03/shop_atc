import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './menu/Menu';
import ProductMain from './productMain/ProductMain';
import Cart from './cart/Cart';


const Home = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
          setToken(storedToken);
      }
  }, []);

  return (
    <div className='home'>
      {/* Phần Menu */}
      <Menu />
      <h1>Trang Chủ</h1>
      <p>Chào mừng bạn đến với trang web của chúng tôi!</p>
      <ProductMain />
      <Cart token={token} />
      
    </div>
  );
};

export default Home;
