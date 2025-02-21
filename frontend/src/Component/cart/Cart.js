import React, { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "../../services/cartService";
import './Cart.css'; // Nhớ import CSS

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      console.warn("⚠ Người dùng chưa đăng nhập. Không thể lấy giỏ hàng.");
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const items = await getCart(); // Lấy giỏ hàng từ API
      console.log('Items from API:', items);  // In dữ liệu trả về từ API để kiểm tra
      setCartItems(items);
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!token) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    try {
      await addToCart(productId);
      fetchCart();
    } catch (error) {
      alert("Không thể thêm vào giỏ hàng.");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!token) {
      alert("Bạn cần đăng nhập để xóa sản phẩm khỏi giỏ hàng!");
      return;
    }

    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (error) {
      alert("Không thể xóa sản phẩm khỏi giỏ hàng.");
    }
  };

  return (
    <div className="cart">
      <h2 className="cart__title">🛒 Giỏ Hàng</h2>
      {token ? (
        cartItems.length === 0 ? (
          <p className="cart__empty">Giỏ hàng trống</p>
        ) : (
          <ul className="cart__list">
            {cartItems.map((item) => {
              console.log('Item Image:', item.image);  // Kiểm tra giá trị của trường ảnh
              return (
                <li key={item.productId} className="cart__item">
                  <div className="cart__item-image">
                    <img
                      src={item.image ? `http://localhost:3000${item.image}` : '/default-image.jpg'}
                      alt={item.name}
                      className="product-detail__image"
                    />
                  </div>
                  <div className="cart__item-details">
                    <span className="cart__item-name">{item.name}</span>
                    <span className="cart__item-quantity">
                      {item.quantity} x {item.price}$
                    </span>
                  </div>
                  <div className="cart__item-actions">
                    <button
                      className="cart__button cart__button--add"
                      onClick={() => handleAddToCart(item.productId)}
                    >
                      Thêm
                    </button>
                    <button
                      className="cart__button cart__button--remove"
                      onClick={() => handleRemoveFromCart(item.productId)}
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )
      ) : (
        <p className="cart__login-prompt">⚠ Bạn cần đăng nhập để xem giỏ hàng.</p>
      )}
    </div>
  );
};

export default Cart;
