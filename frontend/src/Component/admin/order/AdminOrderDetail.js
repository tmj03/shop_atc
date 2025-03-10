import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../services/orderService";
import "./AdminOrderDetail.css";

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getOrderById(orderId, token);
        setOrder(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (!order) {
    return <p className="order-detail__loading">Đang tải chi tiết đơn hàng...</p>;
  }

  return (
    <div className="order-detail">
      <h2 className="order-detail__title">Chi tiết đơn hàng</h2>
      <div className="order-detail__info">
        <p><strong>Mã đơn hàng:</strong> {order._id}</p>
        <p><strong>Người đặt:</strong> {order.userId?.username || "Khách"}</p>
        <p><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString()} đ</p>
        <p><strong>Trạng thái:</strong> {order.status || "Chờ xử lý"}</p>
      </div>

      <h3 className="order-detail__subtitle">Sản phẩm trong đơn</h3>
      <table className="order-detail__table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.productId._id} className="order-detail__item">
              <td>{item.productId.name}</td>
              <td>{item.quantity}</td>
              <td>{item.productId.price.toLocaleString()} đ</td>
              <td>{(item.quantity * item.productId.price).toLocaleString()} đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderDetail;
