import React, { useEffect, useState } from "react";
import { getRevenue } from "../../../services/revenueService"; // Giữ lại hàm getRevenue
import './RevenuePage.css'; // Nếu tệp CSS của bạn được lưu trong cùng thư mục

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const RevenuePage = () => {
    const [revenue, setRevenue] = useState(0);
    const [orders, setOrders] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Doanh thu theo ngày",
                data: [],
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
            },
        ],
    });
    const [totalRevenuePerPeriod, setTotalRevenuePerPeriod] = useState(0); // Thêm state cho tổng doanh thu theo ngày/tháng/năm
    const [filterType, setFilterType] = useState("day"); // Chọn filter: day, month, year
    const [loading, setLoading] = useState(true);  // Thêm state loading

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                // Lấy tổng doanh thu và đơn hàng đã giao theo filterType
                const response = await getRevenue(filterType);

                console.log('Tổng doanh thu:', response.totalRevenue); // Kiểm tra tổng doanh thu
                console.log('Đơn hàng đã giao:', response.deliveredOrders); // Kiểm tra đơn hàng đã giao

                // Kiểm tra nếu dữ liệu hợp lệ
                if (response && response.totalRevenue !== undefined && Array.isArray(response.deliveredOrders)) {
                    setRevenue(response.totalRevenue);
                    setOrders(response.deliveredOrders);

                    // Lấy dữ liệu doanh thu theo ngày/tháng/năm từ API
                    const revenueResponse = response.deliveredOrders;

                    console.log('Dữ liệu doanh thu theo filterType:', revenueResponse); // Kiểm tra dữ liệu trả về

                    // Kiểm tra nếu dữ liệu doanh thu hợp lệ
                    if (revenueResponse && Array.isArray(revenueResponse) && revenueResponse.length > 0) {
                        // Nhóm doanh thu theo ngày/tháng/năm
                        const groupedRevenue = {};
                        let totalRevenue = 0;

                        revenueResponse.forEach((order) => {
                            const date = new Date(order.createdAt);
                            let label;
                            
                            // Chọn nhóm theo ngày, tháng, hoặc năm
                            if (filterType === "day") {
                                label = date.toLocaleDateString(); // Cho ngày
                            } else if (filterType === "month") {
                                label = `${date.getMonth() + 1}/${date.getFullYear()}`; // Cho tháng/năm
                            } else if (filterType === "year") {
                                label = `${date.getFullYear()}`; // Cho năm
                            }

                            // Tính tổng doanh thu cho mỗi nhóm thời gian
                            if (!groupedRevenue[label]) {
                                groupedRevenue[label] = 0;
                            }
                            groupedRevenue[label] += order.totalPrice;
                            totalRevenue += order.totalPrice; // Cộng dồn doanh thu tổng
                        });

                        // Chuyển nhóm doanh thu thành labels và data cho biểu đồ
                        const labels = Object.keys(groupedRevenue);
                        const data = Object.values(groupedRevenue);

                        console.log("Grouped Revenue Labels:", labels);  // Log labels
                        console.log("Grouped Revenue Data:", data);    // Log data

                        // Cập nhật dữ liệu biểu đồ và tổng doanh thu cho từng filter
                        setChartData({
                            labels: labels,
                            datasets: [
                                {
                                    label: `Doanh thu theo ${filterType} (VND)`,
                                    data: data,
                                    borderColor: "rgba(75,192,192,1)",
                                    backgroundColor: "rgba(75,192,192,0.2)",
                                    fill: true,
                                },
                            ],
                        });

                        // Cập nhật tổng doanh thu theo filterType
                        setTotalRevenuePerPeriod(totalRevenue);
                    } else {
                        console.error("Dữ liệu doanh thu không hợp lệ hoặc rỗng");
                    }
                } else {
                    console.error("Dữ liệu không hợp lệ");
                }
            } catch (error) {
                console.error("Error fetching revenue:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filterType]); // Re-fetch data if filterType changes

    return (
        <div className="revenue-page">
            {/* <h2 className="revenue-page__title">📊 Doanh thu hôm nay: {revenue.toLocaleString()} VND</h2> */}
             {/* Biểu đồ doanh thu */}
             {/* Các filter: day, month, year */}
            <div>
                <button onClick={() => setFilterType("day")}>Doanh thu theo ngày</button>
                <button onClick={() => setFilterType("month")}>Doanh thu theo tháng</button>
                <button onClick={() => setFilterType("year")}>Doanh thu theo năm</button>
            </div>
             <div className="revenue-page__chart">
                <h3>📊 Biểu đồ doanh thu theo {filterType}</h3>
                {chartData.labels.length > 0 ? (
                    <Line data={chartData} />
                ) : (
                    <div>🚫 Không có dữ liệu để hiển thị biểu đồ</div>
                )}
            </div>

            {/* Hiển thị tổng doanh thu theo filterType */}
            {totalRevenuePerPeriod > 0 && (
                <div className="revenue-page__total-revenue">
                    <h4>Tổng doanh thu theo {filterType}: {totalRevenuePerPeriod.toLocaleString()} VND</h4>
                </div>
            )}

            
            <h3 className="revenue-page__subtitle">📜 Lịch sử đơn hàng đã giao</h3>

            {/* Hiển thị loading spinner nếu dữ liệu đang được tải */}
            {loading ? (
                <div className="loading-spinner">⏳ Đang tải dữ liệu...</div>
            ) : orders.length === 0 ? (
                <p className="revenue-page__no-orders">❌ Không có đơn hàng nào đã giao</p>
            ) : (
                <div className="revenue-page__table-wrapper">
                    <table className="revenue-page__table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>👤 Khách hàng</th>
                                <th>📍 Địa chỉ</th>
                                <th>🛒 Sản phẩm</th>
                                <th>💰 Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <strong>{order.fullName}</strong>
                                        <br />
                                        📞 {order.phone}
                                    </td>
                                    <td>{order.address}</td>
                                    <td>
                                        <ul className="revenue-page__product-list">
                                            {order.items.map((item) => (
                                                <li key={item.productId._id}>
                                                    🏷️ {item.productId.name} - SL: {item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="revenue-page__total-price">
                                        {order.totalPrice.toLocaleString()} VND
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

           
        </div>
    );
};

export default RevenuePage;
