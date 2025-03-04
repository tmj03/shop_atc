const categoryService = require('../../services/category/categoryService');

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách loại sản phẩm' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy loại sản phẩm' });
    }
};

const createCategory = async (req, res) => {
    try {
        const newCategory = await categoryService.createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo loại sản phẩm' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        if (!updatedCategory) return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật loại sản phẩm' });
    }
};

const deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      // Gọi service để xóa danh mục và các sản phẩm liên quan
      await categoryService.deleteCategory(categoryId);
  
      res.status(200).json({ message: 'Danh mục và sản phẩm đã được xóa thành công!' });
    } catch (error) {
      res.status(500).json({ message: 'Có lỗi xảy ra khi xóa danh mục', error: error.message });
    }
  };

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
