// src/services/cartService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// 🛠 Hàm lấy token an toàn từ localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    // Kiểm tra nếu token bị null hoặc undefined
    if (!token) {
        console.warn("⚠ Không tìm thấy token! Người dùng có thể chưa đăng nhập.");
        return {}; // Có thể thêm throw error nếu token là bắt buộc
    }

    return { Authorization: `Bearer ${token}` };
};

// 🛒 Lấy giỏ hàng
export const getCart = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/cart`, {
            headers: getAuthHeaders(),
        });

        // Kiểm tra cấu trúc trả về từ API
        if (!response.data || !Array.isArray(response.data.items)) {
            console.error("Dữ liệu giỏ hàng không hợp lệ:", response.data);
            return { items: [], totalAmount: 0 }; // Giá trị mặc định hợp lệ, đảm bảo có cấu trúc đúng
        }

        return response.data;
    } catch (error) {
        console.error("❌ Lỗi lấy giỏ hàng:", error);
        // Trả về giá trị mặc định nếu có lỗi xảy ra
        return { items: [], totalAmount: 0 };
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
        throw new Error(error.response?.data?.message || "Có lỗi khi thêm vào giỏ hàng.");
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
        throw new Error(error.response?.data?.message || "Có lỗi khi cập nhật giỏ hàng.");
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
        throw new Error(error.response?.data?.message || "Có lỗi khi xóa sản phẩm khỏi giỏ hàng.");
    }
};
