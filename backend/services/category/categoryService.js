const Category = require('../../models/Category');

// Lấy danh sách tất cả các loại sản phẩm
const getAllCategories = async () => {
    return await Category.find();
};

// Lấy một loại sản phẩm theo ID
const getCategoryById = async (id) => {
    return await Category.findById(id);
};

// Thêm một loại sản phẩm mới
const createCategory = async (data) => {
    const category = new Category(data);
    return await category.save();
};

// Cập nhật thông tin loại sản phẩm
const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
};

// Xóa một loại sản phẩm
const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
