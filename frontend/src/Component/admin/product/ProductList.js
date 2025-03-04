import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getProducts, deleteProduct } from '../../../services/productService';
import ProductForm from './ProductForm';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const [itemsPerPage, setItemsPerPage] = useState(2);  // Giới hạn số lượng sản phẩm hiển thị mỗi trang
    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại

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

    // Phân trang
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    // Chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="product-list">
            <h2 className="product-list__header">Danh sách sản phẩm</h2>
            <button className="product-list__button" onClick={openAddModal}>Thêm sản phẩm</button>
            
            {isModalOpen && (
                <div className="modal">
                    <div className="modal__content">
                        <span className="modal__close" onClick={closeModal}>&times;</span>
                        <ProductForm product={editingProduct} onSuccess={fetchProducts} onClose={closeModal} />
                    </div>
                </div>
            )}

            {loading ? (
                <p>Đang tải danh sách sản phẩm...</p>
            ) : (
                <>
                    <table className="product-list__table">
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
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <tr className="product-list__row" key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.price}đ</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.discount}%</td>
                                        <td>{product.category?.name || 'Không có danh mục'}</td>
                                        <td>
                                            <img
                                                className="product-list__image"
                                                src={product.image ? `http://localhost:3000${product.image}` : '/default-image.jpg'}
                                                alt={product.name}
                                            />
                                        </td>
                                        <td>{product.description || 'Không có mô tả'}</td>
                                        <td>
                                            <button className="product-list__button" onClick={() => openEditModal(product)}>Sửa</button>
                                            <button className="product-list__button" onClick={() => handleDelete(product._id)}>Xóa</button>
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

                    {/* Nút phân trang */}
                    <div className="pagination">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Trước</button>
                        <span>Trang {currentPage} / {totalPages}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Tiếp theo</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
