import axios from 'axios';

const API_URL = 'http://localhost:3000/api/categories';

// Lấy danh sách danh mục
export const getCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Thêm danh mục
export const createCategory = async (category) => {
    const response = await axios.post(API_URL, category);
    return response.data;
};

// Cập nhật danh mục
export const updateCategory = async (id, category) => {
    const response = await axios.put(`${API_URL}/${id}`, category);
    return response.data;
};

// Xóa danh mục
export const deleteCategory = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
