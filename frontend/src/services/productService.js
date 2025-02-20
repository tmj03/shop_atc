import axios from 'axios';

const API_URL = 'http://localhost:3000/api/product'; // Cập nhật URL đúng với backend của bạn

// Lấy danh sách sản phẩm
export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        throw error;
    }
};

// Lấy chi tiết sản phẩm theo ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        throw error;
    }
};

// Tạo sản phẩm mới
export const createProduct = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        throw error;
    }
};

// Cập nhật sản phẩm
export const updateProduct = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        throw error;
    }
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        throw error;
    }
};
