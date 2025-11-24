// controllers/product.controller.js
const productService = require('../services/product.service');

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({
            message: 'Product created successfully!',
            product
        });
    } catch (error) {
        console.error('Product creation error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during product creation.' : error.message;
        res.status(status).json({ message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error('Fetch products error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching products.' : error.message;
        res.status(status).json({ message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error('Get product by id error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching product.' : error.message;
        res.status(status).json({ message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await productService.updateProduct(id, req.body);
        res.status(200).json({
            message: 'Product updated successfully!',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Product update error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during product update.' : error.message;
        res.status(status).json({ message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await productService.deleteProduct(id);
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Product deletion error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during product deletion.' : error.message;
        res.status(status).json({ message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
