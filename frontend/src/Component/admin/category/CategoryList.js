import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../../../services/categoryService';
import CategoryForm from './CategoryForm';
import './CategoryList.css';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showForm, setShowForm] = useState(false); // Trạng thái để hiển thị form

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này và tất cả sản phẩm liên quan?')) {
          try {
            const response = await deleteCategory(categoryId);
            alert(response.message);  // Hiển thị thông báo từ backend
            setCategories(categories.filter(category => category._id !== categoryId));  // Cập nhật lại danh sách
          } catch (error) {
            alert('Có lỗi xảy ra khi xóa danh mục.');
          }
        }
      };

    // Khi bấm vào nút sửa, hiển thị form sửa và truyền dữ liệu vào form
    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowForm(true); // Đảm bảo form sửa hiển thị
    };

    return (
        <div className="category-list">
            <h2 className="category-list__title">Danh Mục Sản Phẩm</h2>

            {/* Nút Thêm Mới */}
            {!showForm && !editingCategory && (
                <button
                    onClick={() => setShowForm(true)}
                    className="category-form__button category-form__button--add"
                >
                    ➕ Thêm Mới
                </button>
            )}

            {/* Hiển thị form và overlay khi showForm là true */}
            {showForm && (
                <div className="overlay">
                    <CategoryForm
                        onCategoryUpdated={fetchCategories}
                        editingCategory={editingCategory}
                        setEditingCategory={setEditingCategory}
                        setShowForm={setShowForm} // Truyền setShowForm vào form để đóng form sau khi thêm/sửa
                    />
                </div>
            )}

            <ul className="category-list__items">
                {categories.map((cat) => (
                    <li key={cat._id} className="category-list__item">
                        <span className="category-list__name">{cat.name}</span>
                        <button
                            onClick={() => handleEdit(cat)} // Gọi handleEdit khi bấm "Sửa"
                            className="category-list__button category-list__button--edit"
                        >
                            ✏️ Sửa
                        </button>
                        <button
                            onClick={() => handleDelete(cat._id)}
                            className="category-list__button category-list__button--delete"
                        >
                            ❌ Xóa
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
