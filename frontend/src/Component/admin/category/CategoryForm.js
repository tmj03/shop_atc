import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../../../services/categoryService';

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
        <div>
            {!showForm && !editingCategory ? (
                <button onClick={() => setShowForm(true)}>➕ Thêm Mới</button>
            ) : (
                <div>
                    <h3>{editingCategory ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nhập tên danh mục"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <button type="submit">{editingCategory ? 'Cập Nhật' : 'Lưu'}</button>
                        <button type="button" onClick={() => { setShowForm(false); setEditingCategory(null); }}>
                            Hủy
                        </button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            )}
        </div>
    );
};

export default CategoryForm;
