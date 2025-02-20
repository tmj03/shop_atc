const Product = require('../../models/Product');

const createProduct = async (data) => {
    try {
        const { name, price, discount, quantity, description, category, image } = data;

        if (!name || !price || !category) {
            throw new Error('Vui lòng nhập đầy đủ thông tin sản phẩm');
        }

        // Mặc định số lượng là 0 nếu không nhập
        const productData = {
            name,
            price,
            discount: discount || 0,  // Giảm giá mặc định là 0 nếu không có
            quantity: quantity || 0,   // Số lượng mặc định là 0
            category,
            image,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const newProduct = new Product(productData);
        await newProduct.save();
        return newProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllProducts = async () => {
    try {
        return await Product.find().populate('category', 'name');
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách sản phẩm');
    }
};

const updateProduct = async (id, data) => {
    try {
        data.updatedAt = new Date(); // Cập nhật thời gian sửa đổi

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!updatedProduct) {
            throw new Error('Không tìm thấy sản phẩm');
        }

        return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw new Error('Không tìm thấy sản phẩm');
        }

        return deletedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};

// ✅ Thêm hàm lấy sản phẩm theo ID
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id).populate('category', 'name');

        if (!product) {
            throw new Error('Không tìm thấy sản phẩm');
        }

        return product;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
