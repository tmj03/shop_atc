// src/services/cartService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// 🛠 Hàm lấy token an toàn từ localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    
    // Kiểm tra nếu token bị null hoặc undefined
    if (!token) {
        console.warn("⚠ Không tìm thấy token! Người dùng có thể chưa đăng nhập.");
        return {};
    }

    return { Authorization: `Bearer ${token}` };
};

// 🛒 Lấy giỏ hàng
export const getCart = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/cart`, {
            headers: getAuthHeaders(),
        });
        return response.data.items || [];
    } catch (error) {
        console.error("❌ Lỗi lấy giỏ hàng:", error);
        return [];
    }
};

// ➕ Thêm sản phẩm vào giỏ hàng
export const addToCart = async (productId) => {
    try {
        const headers = getAuthHeaders();
        if (!headers.Authorization) throw new Error("Token không tồn tại!");

        const response = await axios.post(
            `${BASE_URL}/cart`,
            { productId },
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi thêm vào giỏ hàng:", error);
        throw error;
    }
};



// ✏ Cập nhật số lượng sản phẩm
export const updateCartItem = async (productId, quantity) => {
    try {
        const headers = getAuthHeaders();
        if (!headers.Authorization) throw new Error("Token không tồn tại!");

        const response = await axios.put(
            `${BASE_URL}/cart`,
            { productId, quantity },
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi cập nhật giỏ hàng:", error);
        throw error;
    }
};

// ❌ Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (productId) => {
    try {
        const headers = getAuthHeaders();
        if (!headers.Authorization) throw new Error("Token không tồn tại!");

        const response = await axios.delete(`${BASE_URL}/cart/${productId}`, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
        throw error;
    }
};
