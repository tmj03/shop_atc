import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../../services/productService';
import ProductForm from './ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            setProducts([]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
                alert('Xóa sản phẩm thất bại!');
            }
        }
    };

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <ProductForm product={editingProduct} onSuccess={fetchProducts} />
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
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.discount}%</td>
                                <td>{product.category?.name || 'Không có danh mục'}</td>
                                <td>{product.description}</td>
                                <td>
                                    <img 
                                        src={product.image || '/default-image.jpg'} 
                                        alt={product.name} 
                                        width="50" 
                                        onError={(e) => e.target.src = '/default-image.jpg'}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => setEditingProduct(product)}>Sửa</button>
                                    <button onClick={() => handleDelete(product._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>Không có sản phẩm nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
