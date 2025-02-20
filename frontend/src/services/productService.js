import axios from 'axios';

const API_URL = 'http://localhost:3000/api/product';

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

// ✅ Thêm hàm lấy sản phẩm theo ID
export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

