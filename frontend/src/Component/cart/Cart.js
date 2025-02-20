// src/components/Cart.js
import React, { useEffect, useState } from "react";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
} from "../../services/cartService";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem("token"); // 🛠 Kiểm tra token

    useEffect(() => {
        if (token) {
            fetchCart();
        } else {
            console.warn("⚠ Người dùng chưa đăng nhập. Không thể lấy giỏ hàng.");
        }
    }, [token]);

    const fetchCart = async () => {
        const items = await getCart();
        setCartItems(items);
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
            fetchCart(); // ✅ Gọi lại fetchCart để cập nhật giỏ hàng ngay lập tức
        } catch (error) {
            alert("Không thể xóa sản phẩm khỏi giỏ hàng.");
        }
    };

    return (
        <div>
            <h2>🛒 Giỏ Hàng</h2>
            {token ? (
                cartItems.length === 0 ? (
                    <p>Giỏ hàng trống</p>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.productId}>
                                {item.name} - {item.quantity} x {item.price}$
                                <button onClick={() => handleAddToCart(item.productId)}>Thêm</button>
                                <button onClick={() => handleRemoveFromCart(item.productId)}>Xóa</button>
                            </li>
                        ))}
                    </ul>
                )
            ) : (
                <p>⚠ Bạn cần đăng nhập để xem giỏ hàng.</p>
            )}
        </div>
    );
};

export default Cart;
