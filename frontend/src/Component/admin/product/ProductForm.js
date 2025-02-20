import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../../../services/productService';
import { getCategories } from '../../../services/categoryService';

const ProductForm = ({ product, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discount: '',
        quantity: '',
        image: '',
        category: '',
        description: ''
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (product) {
            setFormData({
                ...product,
                category: product.category?._id || product.category || '' // Giữ danh mục cũ
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData({ ...formData, image: reader.result });
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (product) {
                await updateProduct(product._id, formData);
            } else {
                await createProduct(formData);
            }
            onSuccess();
    
            // Reset form sau khi thêm/cập nhật thành công
            setFormData({
                name: '',
                price: '',
                discount: '',
                quantity: '',
                image: '',
                category: '',
                description: ''
            });
    
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <label>Tên sản phẩm:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Giá:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />

            <label>Số lượng:</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

            <label>Giảm giá (%):</label>
            <input type="number" name="discount" value={formData.discount} onChange={handleChange} />

            <label>Ảnh sản phẩm:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} required={!product} />

            <label>Danh mục:</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <label>Mô tả sản phẩm:</label>
            <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="4" 
                required
            />

            <button type="submit">{product ? 'Cập nhật' : 'Thêm mới'}</button>
        </form>
    );
};

export default ProductForm;
