import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../services/cartService'; // API lấy giỏ hàng
import { getOrdersByUser } from '../../services/orderService'; // API lấy đơn hàng
import './HeaderSection.css';

const HeaderSection = () => {
  const [token, setToken] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0); // Lưu số lượng đơn hàng
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchCart(); // Lấy giỏ hàng
      fetchOrders(); // Lấy số lượng đơn hàng
    }
  }, [token]);

  // Lấy thông tin giỏ hàng
  const fetchCart = async () => {
    if (token) {
      try {
        const data = await getCart();
        if (data && Array.isArray(data.items)) {
          const totalItems = data.items.reduce((total, item) => total + (item.quantity || 0), 0);
          setCartItemCount(totalItems);
        }
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    }
  };

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    if (token) {
      try {
        const orders = await getOrdersByUser(); // Gọi API lấy danh sách đơn hàng
        if (Array.isArray(orders)) {
          setOrderCount(orders.length); // Cập nhật số lượng đơn hàng
        }
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
      }
    }
  };

  const handleGoToCart = () => {
    if (!token) {
      alert("Bạn cần đăng nhập để xem giỏ hàng.");
      return;
    }
    navigate('/cart');
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  return (
    <div className="header-section">
      <button className="header-section__button header-section__button--cart" onClick={handleGoToCart}>
        🛒 Giỏ hàng ({cartItemCount})
      </button>
      <button className="header-section__button header-section__button--orders" onClick={goToOrders}>
        📦 Đơn hàng ({orderCount})
      </button>
    </div>
  );
};

export default HeaderSection;
