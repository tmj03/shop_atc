import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../../../services/categoryService';
import CategoryForm from './CategoryForm';

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
        <div>
            <h2>Danh Mục Sản Phẩm</h2>
            <CategoryForm
                onCategoryUpdated={fetchCategories} // Cập nhật ngay khi thêm/sửa
                editingCategory={editingCategory}
                setEditingCategory={setEditingCategory}
            />
            <ul>
                {categories.map((cat) => (
                    <li key={cat._id}>
                        {cat.name}
                        <button onClick={() => setEditingCategory(cat)}>✏️ Sửa</button>
                        <button onClick={() => handleDelete(cat._id)}>❌ Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
