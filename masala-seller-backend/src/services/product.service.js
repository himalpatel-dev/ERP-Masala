// services/product.service.js
const db = require('../models');
const Product = db.Product;

const createProduct = async (productData) => {
    try {
        const { name, productCode, description, isActive, categoryId, subCategoryId } = productData;

        if (!name) {
            const err = new Error('Product name is required.');
            err.status = 400;
            throw err;
        }

        const product = await Product.create({ name, productCode, description, isActive, categoryId, subCategoryId });
        return product;
    } catch (error) {
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A product with this code/name already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const getAllProducts = async () => {
    try {
        const products = await Product.findAll({
            order: [['name', 'ASC']]
        });
        return products;
    } catch (error) {
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            const err = new Error('Product not found.');
            err.status = 404;
            throw err;
        }
        return product;
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (id, updateData) => {
    try {
        const [updatedCount] = await Product.update(
            {
                name: updateData.name,
                productCode: updateData.productCode,
                description: updateData.description,
                isActive: updateData.isActive,
                categoryid: updateData.categoryid,
                subcategoryid: updateData.subcategoryid
            },
            { where: { id } }
        );

        if (updatedCount && updatedCount > 0) {
            const updatedProduct = await Product.findByPk(id);
            return updatedProduct;
        }

        const err = new Error('Product not found.');
        err.status = 404;
        throw err;
    } catch (error) {
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A product with this code/name already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const deletedCount = await Product.destroy({ where: { id } });
        if (deletedCount && deletedCount > 0) return true;

        const err = new Error('Product not found.');
        err.status = 404;
        throw err;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
