import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './menu/Menu';
import ProductMain from './productMain/ProductMain';
import './Home.css';
import HeaderSection from './headerSection/HeaderSection';



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
      <Menu />
      <HeaderSection />
      <ProductMain />
      
    </div>
  );
};

export default Home;
