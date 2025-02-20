import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getProducts, deleteProduct } from '../../../services/productService';
import ProductForm from './ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);

    const fetchProducts = useCallback(async () => {
        if (!isMounted.current) return;
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;
        fetchProducts();
        return () => { isMounted.current = false; };
    }, [fetchProducts]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProduct(id);
                setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
                alert('Không thể xóa sản phẩm. Vui lòng thử lại.');
            }
        }
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <button onClick={openAddModal}>Thêm sản phẩm</button>
            
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <ProductForm product={editingProduct} onSuccess={fetchProducts} onClose={closeModal} />
                    </div>
                </div>
            )}

            {loading ? (
                <p>Đang tải danh sách sản phẩm...</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Giảm giá</th>
                            <th>Danh mục</th>
                            <th>Hình ảnh</th>
                            <th>Mô tả</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}đ</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.discount}%</td>
                                    <td>{product.category?.name || 'Không có danh mục'}</td>
                                    <td>
                                        <img
                                            src={product.image ? `http://localhost:3000${product.image}` : '/default-image.jpg'}
                                            alt={product.name}
                                            width="50"
                                            height="50"
                                            onError={(e) => e.target.src = '/default-image.jpg'}
                                        />
                                    </td>
                                    <td>{product.description || 'Không có mô tả'}</td>
                                    <td>
                                        <button onClick={() => openEditModal(product)}>Sửa</button>
                                        <button onClick={() => handleDelete(product._id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center' }}>Không có sản phẩm nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
