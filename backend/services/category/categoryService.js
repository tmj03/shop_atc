const Category = require('../../models/Category');
const Product = require('../../models/Product');
const fs = require('fs');
const path = require('path');

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


const deleteCategory = async (category) => {
    try {

            // Lấy tất cả sản phẩm thuộc danh mục
        const products = await Product.find({ category });

        // Xóa tất cả sản phẩm và ảnh của chúng
        for (const product of products) {
            if (product.image) {
            // Xóa ảnh sản phẩm nếu có
            const imagePath = path.join(__dirname, '..', '..', '..', product.image); // Đảm bảo đường dẫn đúng
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);  // Xóa tệp ảnh
                console.log(`Đã xóa ảnh: ${imagePath}`);
            } else {
                console.log(`Không tìm thấy ảnh: ${imagePath}`);
            }
            }
        }
        // Xóa tất cả sản phẩm thuộc danh mục
        await Product.deleteMany({ category });
    
        // Xóa danh mục
        await Category.findByIdAndDelete(category);
    
        return { success: true, message: 'Danh mục và các sản phẩm đã được xóa thành công!' };
      } catch (error) {
        console.error('Lỗi khi xóa danh mục và sản phẩm:', error);
        throw new Error('Có lỗi xảy ra khi xóa danh mục và sản phẩm');
      }
  };

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
