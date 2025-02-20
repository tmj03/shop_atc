import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/productService';
import { Link } from 'react-router-dom';

const ProductMain = () => {
    const [products, setProducts] = useState([]);

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

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.image ? `http://localhost:3000${product.image}` : '/default-image.jpg'}
                            alt={product.name}
                            width="50"
                            height="50"
                            onError={(e) => e.target.src = '/default-image.jpg'}
                        />
                        <h3>{product.name}</h3>
                        <p>Giá: {product.price} VNĐ</p>
                        <Link to={`/product/${product._id}`}>Xem chi tiết</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductMain;
