import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../services/cartService'; // Giả sử bạn có API để lấy giỏ hàng

const HeaderSection = () => {
  const [token, setToken] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0); // Lưu số lượng sản phẩm trong giỏ
  const navigate = useNavigate();

  useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
          setToken(storedToken);
          fetchCart(); // Lấy thông tin giỏ hàng khi có token
      }
  }, [token]);

  const fetchCart = async () => {
    if (token) {
      try {
        const cartItems = await getCart(); // Giả sử API trả về danh sách sản phẩm trong giỏ
        if (cartItems && Array.isArray(cartItems)) {
          const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0); // Tính tổng số sản phẩm
          setCartItemCount(totalItems); // Cập nhật số lượng sản phẩm
        } else {
          console.error("Dữ liệu giỏ hàng không hợp lệ:", cartItems);
        }
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    }
  };

  const handleGoToCart = () => {
    if (!token) {
      alert("Bạn cần đăng nhập để xem giỏ hàng.");
      return;
    }
    navigate('/cart'); // Chuyển đến trang giỏ hàng
  };

  return (
    <div className='HeaderSection'>
      <button onClick={handleGoToCart}>
        Giỏ hàng ({cartItemCount}) {/* Hiển thị số lượng sản phẩm */}
      </button>
    </div>
  );
};

export default HeaderSection;
