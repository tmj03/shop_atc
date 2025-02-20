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
    const [selectedImage, setSelectedImage] = useState(null); // Hiển thị ảnh mới khi chọn

    // Lấy danh mục sản phẩm
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

    // Load dữ liệu sản phẩm nếu đang chỉnh sửa
    useEffect(() => { 
        if (product) {
            setFormData({
                name: product.name || '',
                price: product.price || '',
                discount: product.discount || '',
                quantity: product.quantity || '',
                image: null, // Không load ảnh cũ vào input file
                category: product.category?._id || product.category || '',
                description: product.description || ''
            });

            setSelectedImage(product.image || null); // Hiển thị ảnh cũ
        }
    }, [product]);

    // Xử lý thay đổi input text
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Xử lý thay đổi file ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                image: file, // Lưu file mới
            }));
            setSelectedImage(URL.createObjectURL(file)); // Hiển thị ảnh mới
        }
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === "image" && !formData.image) return; // Không gửi ảnh nếu không chọn mới
            if (formData[key] !== null && formData[key] !== '') {
                form.append(key, formData[key]);
            }
        });

        try {
            if (product) {
                await updateProduct(product._id, form);
            } else {
                await createProduct(form);
                setFormData({
                    name: '',
                    price: '',
                    discount: '',
                    quantity: '',
                    image: null,
                    category: '',
                    description: ''
                });
                setSelectedImage(null);
            }
            onSuccess(); // Reload danh sách sản phẩm
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
                {selectedImage && (
                    <div className="product-form__preview">
                        <img src={selectedImage} alt="Ảnh sản phẩm" width={50}/>
                    </div>
                )}
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

            <button type="submit" className="product-form__button">
                {product ? 'Cập nhật' : 'Thêm mới'}
            </button>
        </form>
    );
};

export default ProductForm;
