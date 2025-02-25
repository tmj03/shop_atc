import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Thay URL đúng với backend của bạn

export const placeOrder = async (orderData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn cần đăng nhập để đặt hàng!");

  const response = await axios.post(`${API_URL}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getOrdersByUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn cần đăng nhập để xem đơn hàng!");

  const response = await axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Lấy danh sách tất cả đơn hàng (Admin)
export const getAllOrders = async (token) => {
  if (!token) throw new Error("Bạn cần đăng nhập để xem danh sách đơn hàng!");

  const response = await axios.get(`${API_URL}/admin/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Cập nhật trạng thái đơn hàng (Admin)
export const updateOrderStatus = async (orderId, status, token) => {
  if (!token) throw new Error("Bạn cần đăng nhập để cập nhật đơn hàng!");

  const response = await axios.patch(
    `${API_URL}/orders/${orderId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};


// Lấy chi tiết đơn hàng theo ID (Admin)
export const getOrderById = async (orderId, token) => {
  if (!token) throw new Error("Bạn cần đăng nhập để xem chi tiết đơn hàng!");

  const response = await axios.get(`${API_URL}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
