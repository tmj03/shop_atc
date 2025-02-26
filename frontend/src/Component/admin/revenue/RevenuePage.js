import React, { useEffect, useState } from "react";
import { getRevenue } from "../../../services/revenueService";

const RevenuePage = () => {
    const [revenue, setRevenue] = useState(0);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRevenue("day"); // Mặc định hiển thị doanh thu trong ngày
                setRevenue(response.totalRevenue);
                setOrders(response.deliveredOrders);
            } catch (error) {
                console.error("Error fetching revenue:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>📊 Doanh thu hôm nay: {revenue.toLocaleString()} VND</h2>
            <h3>📜 Lịch sử đơn hàng đã giao</h3>
            {orders.length === 0 ? (
                <p>❌ Không có đơn hàng nào đã giao</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                            <strong>👤 Khách hàng:</strong> {order.fullName} - {order.phone}
                            <br />
                            <strong>📍 Địa chỉ:</strong> {order.address}
                            <br />
                            <strong>🛒 Sản phẩm:</strong>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.productId._id}>
                                        🏷️ {item.productId.name} - SL: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <strong>💰 Tổng tiền:</strong> {order.totalPrice.toLocaleString()} VND
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RevenuePage;
