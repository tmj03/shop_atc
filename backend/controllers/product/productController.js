const productService = require('../../services/product/productService');
const upload = require('../../middleware/upload');

const createProduct = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const { name, price, discount, quantity, description, category } = req.body;
            if (!name || !price || !quantity || !description || !category) {
                return res.status(400).json({ message: 'Thiếu dữ liệu bắt buộc' });
            }
            const image = req.file ? `/uploads/images/${req.file.filename}` : '';
            const newProduct = await productService.createProduct({ name, price, discount, quantity, description, category, image });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ message: 'Cập nhật sản phẩm thành công', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID không hợp lệ' });
        }
        const product = await productService.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };