import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../../../services/productService';
import { getCategories } from '../../../services/categoryService';
import './ProductForm.css';

const ProductForm = ({ product, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discount: '',
        quantity: '',
        image: null,
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
                name: product.name || '',
                price: product.price || '',
                discount: product.discount || '',
                quantity: product.quantity || '',
                image: null,
                category: product.category?._id || product.category || '',
                description: product.description || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            image: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== '') {
                form.append(key, formData[key]);
            }
        });

        try {
            if (product) {
                await updateProduct(product._id, form);
            } else {
                await createProduct(form);
            }
            onSuccess();
            setFormData({
                name: '',
                price: '',
                discount: '',
                quantity: '',
                image: null,
                category: '',
                description: ''
            });
        } catch (error) {
            console.error('Lỗi khi xử lý sản phẩm:', error);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="product-form__group">
                <label className="product-form__label">Tên sản phẩm:</label>
                <input type="text" className="product-form__input" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="product-form__group">
                <label className="product-form__label">Giá:</label>
                <input type="number" className="product-form__input" name="price" value={formData.price} onChange={handleChange} required min="0" />
            </div>

            <div className="product-form__group">
                <label className="product-form__label">Số lượng:</label>
                <input type="number" className="product-form__input" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" />
            </div>

            <div className="product-form__group">
                <label className="product-form__label">Giảm giá (%):</label>
                <input type="number" className="product-form__input" name="discount" value={formData.discount} onChange={handleChange} min="0" />
            </div>

            <div className="product-form__group">
                <label className="product-form__label">Ảnh sản phẩm:</label>
                <input type="file" className="product-form__input" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="product-form__group">
                <label className="product-form__label">Danh mục:</label>
                <select className="product-form__select" name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Chọn danh mục</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="product-form__group">
                <label className="product-form__label">Mô tả sản phẩm:</label>
                <textarea className="product-form__textarea" name="description" value={formData.description} onChange={handleChange} rows="4" required />
            </div>

            <button type="submit" className="product-form__button">{product ? 'Cập nhật' : 'Thêm mới'}</button>
        </form>
    );
};

export default ProductForm;
