const Product = require('../../models/Product');

// Kiểm tra dữ liệu và tạo sản phẩm mới
const createProduct = async (data) => {
    try {
        const { name, price, discount, quantity, description, category, image } = data;

        // Kiểm tra các trường bắt buộc
        if (!name || !price || !category) {
            throw new Error('Vui lòng nhập đầy đủ thông tin sản phẩm');
        }

        // Kiểm tra giá trị hợp lệ của price, discount và quantity
        const parsedPrice = parseFloat(price);
        const parsedQuantity = parseInt(quantity, 10);
        const parsedDiscount = discount ? parseFloat(discount) : 0;

        if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
            throw new Error('Giá và số lượng phải là số hợp lệ');
        }

        // Mặc định giảm giá và số lượng là 0 nếu không nhập
        const productData = {
            name,
            price: parsedPrice,
            discount: parsedDiscount,  // Giảm giá mặc định là 0 nếu không có
            quantity: parsedQuantity,   // Số lượng mặc định là 0 nếu không có
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

// Lấy tất cả sản phẩm
const getAllProducts = async () => {
    try {
        return await Product.find().populate('category', 'name');
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách sản phẩm');
    }
};

// Cập nhật sản phẩm
const updateProduct = async (id, data) => {
    try {
        // Đảm bảo cập nhật thời gian sửa đổi tự động qua Mongoose
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!updatedProduct) {
            throw new Error('Không tìm thấy sản phẩm');
        }

        return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Xóa sản phẩm
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

// Lấy sản phẩm theo ID
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
