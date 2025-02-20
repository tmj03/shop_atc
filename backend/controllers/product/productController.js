const productService = require('../../services/product/productService');

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ message: 'Thêm sản phẩm thành công', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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

const Product = require('../../models/Product');

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID có đúng định dạng MongoDB không
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID không hợp lệ' });
        }

        const product = await Product.findById(id).populate('category', 'name');

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm' });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,

}
