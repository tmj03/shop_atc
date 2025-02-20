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
        const deletedCategory = await categoryService.deleteCategory(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
        res.json({ message: 'Loại sản phẩm đã bị xóa' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa loại sản phẩm' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
