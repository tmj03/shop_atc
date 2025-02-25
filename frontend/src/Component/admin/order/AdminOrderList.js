import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../../services/orderService";
import { useNavigate } from "react-router-dom";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Bạn cần đăng nhập!");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(token);
        setOrders(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus, token);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Cập nhật thất bại!");
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="container">
      <h2>📦 Quản lý Đơn Hàng</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Người đặt</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.fullName}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>
                {order.items.map((item) => (
                  <p key={item.productId._id}>
                    {item.productId.name} - {item.quantity}x
                  </p>
                ))}
              </td>
              <td>{order.totalPrice} VND</td>
              <td>
                <span
                  className={`badge ${
                    order.status === "pending"
                      ? "bg-warning"
                      : order.status === "shipped"
                      ? "bg-info"
                      : order.status === "delivered"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="form-select"
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="shipped">Đang giao</option>
                  <option value="delivered">Đã giao</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleViewOrder(order._id)}>👀 Xem chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;
