import React, { useState } from "react";
import { placeOrder } from "../../services/orderService";

const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({ fullName: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
      await placeOrder(orderData);
      setMessage("🎉 Đặt hàng thành công!");
      setFormData({ fullName: "", phone: "", address: "" });
    } catch (error) {
      alert("Lỗi khi đặt hàng: " + (error.response?.data?.message || "Thử lại sau!"));
    }
    setLoading(false);
  };

  return (
    <div className="checkout">
      <h2>🛍 Thanh toán</h2>
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Họ tên" value={formData.fullName} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
        <input type="text" name="address" placeholder="Địa chỉ nhận hàng" value={formData.address} onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? "Đang xử lý..." : "🛒 Đặt hàng"}</button>
      </form>
    </div>
  );
};

export default Checkout;
