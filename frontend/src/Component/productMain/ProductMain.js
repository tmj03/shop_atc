import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/productService';
import { Link } from 'react-router-dom';
import './ProductMain.css';

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
        <div className="product-main">
            <h2 className="product-main__title">Danh sách sản phẩm</h2>
            <div className="product-main__grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.image ? `http://localhost:3000${product.image}` : '/default-image.jpg'}
                            alt={product.name}
                            className="product-card__image"
                        />
                        <h3 className="product-card__name">{product.name}</h3>
                        <p className="product-card__price">Giá: {product.price} VNĐ</p>
                        <Link to={`/product/${product._id}`} className="product-card__link">Xem chi tiết</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductMain;
