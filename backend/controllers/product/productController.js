const productService = require('../../services/product/productService');
const upload = require('../../middleware/upload');
const fs = require('fs');
const path = require('path');

// Hàm kiểm tra dữ liệu sản phẩm
const validateProductData = (data) => {
    const { name, price, quantity, description, category } = data;
    if (!name || !price || !quantity || !description || !category) {
        return 'Thiếu dữ liệu bắt buộc';
    }
    if (isNaN(price) || price <= 0) {
        return 'Giá sản phẩm phải là một số dương';
    }
    if (isNaN(quantity) || quantity < 0) {
        return 'Số lượng phải là một số nguyên không âm';
    }
    return null;
};

// Tạo sản phẩm
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

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    const { id } = req.params;

    console.log('Dữ liệu yêu cầu:', req.body);  // Kiểm tra dữ liệu gửi lên
    console.log('File hình ảnh:', req.file);  // Kiểm tra hình ảnh gửi lên

    // Kiểm tra dữ liệu đầu vào
    const errorMessage = validateProductData(req.body);
    if (errorMessage) {
        console.log('Lỗi dữ liệu:', errorMessage); // In lỗi nếu có
        return res.status(400).json({ message: errorMessage });
    }

    try {
        // Kiểm tra nếu sản phẩm tồn tại
        const existingProduct = await productService.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
        }

        // Giữ lại hình ảnh cũ nếu không có hình ảnh mới
        let image = existingProduct.image;
        if (req.file) {
            // Nếu có hình ảnh mới, thay thế hình ảnh cũ
            image = `/uploads/images/${req.file.filename}`;

            // Xóa hình ảnh cũ nếu có
            const oldImagePath = path.join(__dirname, '..', '..', '..', existingProduct.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Xóa tệp hình ảnh cũ
            }
        }

        const updatedProduct = await productService.updateProduct(id, { ...req.body, image });
        res.status(200).json({ message: 'Cập nhật sản phẩm thành công', product: updatedProduct });
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error.message); // In lỗi chi tiết
        res.status(500).json({ error: error.message });
    }
};


// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (product && product.image) {
            // Xóa hình ảnh khi xóa sản phẩm
            const imagePath = path.join(__dirname, '..', '..', '..', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Xóa tệp hình ảnh
            }
        }

        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy sản phẩm theo ID
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
