import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../../../services/categoryService';
import CategoryForm from './CategoryForm';
import './CategoryList.css';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        await deleteCategory(id);
        fetchCategories();
    };

    return (
        <div className="category-list">
            <h2 className="category-list__title">Danh Mục Sản Phẩm</h2>
            <CategoryForm
                onCategoryUpdated={fetchCategories}
                editingCategory={editingCategory}
                setEditingCategory={setEditingCategory}
            />
            <ul className="category-list__items">
                {categories.map((cat) => (
                    <li key={cat._id} className="category-list__item">
                        <span className="category-list__name">{cat.name}</span>
                        <button 
                            onClick={() => setEditingCategory(cat)} 
                            className="category-list__button category-list__button--edit">
                            ✏️ Sửa
                        </button>
                        <button 
                            onClick={() => handleDelete(cat._id)} 
                            className="category-list__button category-list__button--delete">
                            ❌ Xóa
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
