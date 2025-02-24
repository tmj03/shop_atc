import React, { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "../../services/cartService";
import Checkout from "./Checkout";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Đảm bảo cartItems là mảng, mặc định là mảng rỗng
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const data = await getCart(); // Giả sử API trả về một đối tượng có cấu trúc bạn đã cung cấp
      console.log("Dữ liệu giỏ hàng nhận được từ API:", data);
      setCartItems(data.items || []); // Kiểm tra và gán mảng rỗng nếu không có items
      setTotalAmount(data.totalAmount || 0); // Kiểm tra và gán 0 nếu không có totalAmount
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!token) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }
    try {
      await addToCart(productId);
      fetchCart(); // Cập nhật lại giỏ hàng sau khi thêm sản phẩm
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
      fetchCart(); // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
    } catch (error) {
      alert("Không thể xóa sản phẩm khỏi giỏ hàng.");
    }
  };

  return (
    <div className="cart">
      <h2 className="cart__title">🛒 Giỏ Hàng</h2>
      {token ? (
        cartItems.length === 0 ? ( // Kiểm tra xem có sản phẩm trong giỏ không
          <p className="cart__empty">Giỏ hàng trống</p>
        ) : (
          <>
            <ul className="cart__list">
              {cartItems.map((item) => (
                <li key={item.productId} className="cart__item">
                  <div className="cart__item-image">
                    <img
                      src={item.image ? `http://localhost:3000${item.image}` : "/default-image.jpg"}
                      alt={item.name}
                    />
                  </div>
                  <div className="cart__item-details">
                    <span className="cart__item-name">{item.name}</span>
                    <span className="cart__item-quantity">
                      {item.quantity} x {item.price}$ = {item.quantity * item.price}$
                    </span>
                  </div>
                  <div className="cart__item-actions">
                    <button onClick={() => handleAddToCart(item.productId)}>Thêm</button>
                    <button onClick={() => handleRemoveFromCart(item.productId)}>Xóa</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart__total">
              <h3>Tổng tiền: <span>{totalAmount}$</span></h3> {/* Hiển thị tổng tiền */}
            </div>
            <button className="cart__checkout-button" onClick={() => setShowCheckout(true)}>
              Mua hàng
            </button>
          </>
        )
      ) : (
        <p className="cart__login-prompt">⚠ Bạn cần đăng nhập để xem giỏ hàng.</p>
      )}
      {showCheckout && <Checkout cartItems={cartItems} />}
    </div>
  );
};

export default Cart;
