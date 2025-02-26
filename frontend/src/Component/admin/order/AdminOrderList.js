import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../../services/orderService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminOrderList.css"; // Import CSS

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.warning("Bạn cần đăng nhập!", { position: "top-center" });
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(token);
        setOrders(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách đơn hàng:", error);
        toast.error("Không thể tải danh sách đơn hàng!", { position: "top-right" });
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
      toast.success("Cập nhật trạng thái thành công!", { position: "top-right" });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Cập nhật thất bại!", { position: "top-right" });
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) return <p className="order-list__loading">Đang tải...</p>;

  return (
    <div className="order-list">
      <h2 className="order-list__title">📦 Quản lý Đơn Hàng</h2>
      <table className="order-list__table">
        <thead>
          <tr className="order-list__table-header">
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
            <tr key={order._id} className="order-list__table-row">
              <td>{index + 1}</td>
              <td>{order.fullName}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>
                {order.items.map((item) => (
                  <p key={item.productId._id} className="order-list__product">
                    {item.productId.name} - {item.quantity}x
                  </p>
                ))}
              </td>
              <td>{order.totalPrice} VND</td>
              <td>
                <span className={`order-list__status order-list__status--${order.status}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="order-list__select"
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="shipped">Đang giao</option>
                  <option value="delivered">Đã giao</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleViewOrder(order._id)}
                  className="order-list__button"
                >
                  👀 Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;
