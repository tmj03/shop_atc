import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../../../services/categoryService';
import './CategoryForm.css';

const CategoryForm = ({ onCategoryUpdated, editingCategory, setEditingCategory, setShowForm }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (editingCategory) {
            setName(editingCategory.name); // Khi có editingCategory, điền dữ liệu vào ô input
        }
    }, [editingCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateCategory(editingCategory._id, { name });
                setMessage('Cập nhật danh mục thành công!');
            } else {
                await createCategory({ name });
                setMessage('Thêm danh mục thành công!');
            }
            setName('');
            setEditingCategory(null);
            onCategoryUpdated(); // Cập nhật danh sách ngay lập tức
            setShowForm(false); // Đóng form sau khi thêm/sửa thành công
        } catch (error) {
            setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="category-form">
            <h3 className="category-form__title">
                {editingCategory ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}
            </h3>
            <form onSubmit={handleSubmit} className="category-form__form">
                <input
                    type="text"
                    placeholder="Nhập tên danh mục"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="category-form__input"
                />
                <div className="category-form__actions">
                    <button type="submit" className="category-form__button category-form__button--submit">
                        {editingCategory ? 'Cập Nhật' : 'Lưu'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setShowForm(false); // Đóng form khi hủy
                            setEditingCategory(null);
                        }}
                        className="category-form__button category-form__button--cancel"
                    >
                        Hủy
                    </button>
                </div>
            </form>
            {message && <p className="category-form__message">{message}</p>}
        </div>
    );
};

export default CategoryForm;
