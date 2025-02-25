import React, { useEffect, useState } from "react";
import { getOrdersByUser } from "../../services/orderService";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUser();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Lỗi khi tải đơn hàng!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>⏳ Đang tải đơn hàng...</p>;
  if (error) return <p className="error">❌ {error}</p>;

  return (
    <div className="order-list">
      <h2>📦 Đơn hàng của bạn</h2>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <p>🆔 Mã đơn: {order._id}</p>
              <p>📅 Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>💰 Tổng tiền: {order.totalPrice} VND</p>
              <p>📍 Trạng thái: {order.status}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    🛒 {item.productId.name} - SL: {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
