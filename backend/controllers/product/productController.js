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


const updateProduct = async (req, res) => {
    // Xử lý upload file trước khi thực hiện cập nhật
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file' });
      }
  
      // Lấy dữ liệu từ form
      const { name, price, description, discount, quantity, category } = req.body;
      const newImage = req.file ? `/uploads/images/${req.file.filename}` : ''; // Lấy đường dẫn ảnh nếu có
  
      try {
        // Lấy thông tin sản phẩm cũ để xử lý xóa ảnh nếu có thay đổi
        const product = await productService.getProductById(req.params.id);
        const oldImage = product.image;
  
        // Nếu có ảnh mới và ảnh cũ khác với ảnh mới, xóa ảnh cũ
        if (newImage && oldImage && oldImage !== newImage) {
          const oldImagePath = path.join(__dirname, '..', '..', '..', oldImage); // Tạo đường dẫn tới ảnh cũ
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Xóa ảnh cũ
          }
        }
  
        // Cập nhật sản phẩm với ảnh mới (hoặc ảnh cũ nếu không thay đổi)
        const updatedProduct = await productService.updateProduct(req.params.id, 
          { name, price, discount, quantity, description, category }, newImage || oldImage);
        
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
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
