import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../../../services/categoryService';
import './CategoryForm.css';

const CategoryForm = ({ onCategoryUpdated, editingCategory, setEditingCategory }) => {
    const [name, setName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (editingCategory) {
            setName(editingCategory.name);
            setShowForm(true); // Mở form khi chọn "Sửa"
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
            setShowForm(false);
            setEditingCategory(null);
            onCategoryUpdated(); // Cập nhật danh sách ngay lập tức
        } catch (error) {
            setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="category-form">
            {!showForm && !editingCategory ? (
                <button onClick={() => setShowForm(true)} className="category-form__button category-form__button--add">
                    ➕ Thêm Mới
                </button>
            ) : (
                <div className="category-form__container">
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
                                onClick={() => { setShowForm(false); setEditingCategory(null); }} 
                                className="category-form__button category-form__button--cancel"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                    {message && <p className="category-form__message">{message}</p>}
                </div>
            )}
        </div>
    );
};

export default CategoryForm;
