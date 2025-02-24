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
