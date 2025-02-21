import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { addToCart } from '../../services/cartService';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Không thể tải sản phẩm');
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem("token"); // 🛠 Lấy token từ localStorage
        
        if (!token) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
            return;
        }
    
        try {
            await addToCart(productId); // Không cần truyền token nếu đã xử lý trong `cartService`
            alert("Đã thêm vào giỏ hàng");
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            alert("Không thể thêm vào giỏ hàng.");
        }
    };

    if (!product) {
        return <p>Đang tải...</p>;
    }

    return (
        <div className="product-detail">
            <h2 className="product-detail__title">{product.name}</h2>
            <div className="product-detail__info">
                <img
                    src={product.image ? `http://localhost:3000${product.image}` : '/default-image.jpg'}
                    alt={product.name}
                    className="product-detail__image"
                />
                <div className="product-detail__text">
                    <p className="product-detail__price">Giá: {product.price} VNĐ</p>
                    <p className="product-detail__description">Mô tả: {product.description}</p>
                    <p className="product-detail__quantity">Số lượng: {product.quantity}</p>
                    <button
                        className="product-detail__button"
                        onClick={() => handleAddToCart(product._id)}
                    >
                        Thêm vào giỏ hàng
                    </button>
                    {message && <p className="product-detail__message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
