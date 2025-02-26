import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/productService';
import { Link } from 'react-router-dom';
import './ProductMain.css';

const ProductMain = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // "asc" hoặc "desc"
    const [discountFilter, setDiscountFilter] = useState(false); // Toggle lọc sản phẩm giảm giá

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Không thể tải sản phẩm');
            }
        };

        fetchProducts();
    }, []);

    // Lấy danh sách danh mục duy nhất từ sản phẩm
    const categories = [...new Set(products.map(product => 
        typeof product.category === 'object' ? product.category.name : product.category
    ))];

    // Lọc sản phẩm theo điều kiện
    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? product.category === selectedCategory || product.category?.name === selectedCategory : true) &&
        (!discountFilter || (product.discount && product.discount > 0)) // Chỉ hiển thị sản phẩm có giảm giá nếu bật nút
    );

    // Sắp xếp sản phẩm theo giá
    if (sortOrder === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="product-main">

            {/* Bộ lọc */}
            <div className="filter-container">
            {/* Thanh tìm kiếm */}
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="product-search"
            />
                {/* Lọc theo danh mục */}
                <select onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
                    <option value="">Tất cả danh mục</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {/* Lọc theo giá tăng/giảm */}
                <select onChange={(e) => setSortOrder(e.target.value)} className="filter-select">
                    <option value="">Sắp xếp giá</option>
                    <option value="asc">Giá tăng dần</option>
                    <option value="desc">Giá giảm dần</option>
                </select>

                {/* Nút lọc sản phẩm giảm giá */}
                <button 
                    className={`discount-button ${discountFilter ? "active" : ""}`} 
                    onClick={() => setDiscountFilter(!discountFilter)}
                >
                    {discountFilter ? "Hiển thị tất cả" : "Chỉ giảm giá"}
                </button>
            </div>

            {/* Hiển thị sản phẩm */}
            <div className="product-main__grid">
                {filteredProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.image ? `http://localhost:3000${product.image}` : '/default-image.jpg'}
                            alt={product.name}
                            className="product-card__image"
                        />
                        <h3 className="product-card__name">{product.name}</h3>

                        {/* Hiển thị giá và giảm giá */}
                        {product.discount && product.discount > 0 ? (
                            <p className="product-card__price">
                                <span className="original-price">{product.price} VNĐ</span>
                                <span className="discounted-price">
                                    {product.price - (product.price * product.discount / 100)} VNĐ
                                </span>
                                <span className="discount-tag">-{product.discount}%</span>
                            </p>
                        ) : (
                            <p className="product-card__price">Giá: {product.price} VNĐ</p>
                        )}

                        <Link to={`/product/${product._id}`} className="product-card__link">Xem chi tiết</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductMain;
