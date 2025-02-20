import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { addToCart } from '../../services/cartService';

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
        <div>
            <h2>{product.name}</h2>
            <img
                src={product.image ? `http://localhost:3000${product.image}` : '/default-image.jpg'}
                alt={product.name}
                width="50"
                height="50"
                onError={(e) => e.target.src = '/default-image.jpg'}
            />
            <p>Giá: {product.price} VNĐ</p>
            <p>Mô tả: {product.description}</p>
            <p>Số lượng: {product.quantity}</p>
            <button onClick={() => handleAddToCart(product._id)}>Thêm vào giỏ hàng</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProductDetail;
