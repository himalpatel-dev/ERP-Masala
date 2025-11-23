const db = require('../models');
const Category = db.Category;

const createCategory = async (categoryData) => {
    try {
        const { name, description } = categoryData;

        if (!name) {
            const err = new Error('Category name is required.');
            err.status = 400;
            throw err;
        }

        const category = await Category.create({ name, description });
        return category;
    } catch (error) {
        // Normalize unique constraint error to 409
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A category with this name already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const getAllCategories = async () => {
    try {
        const categories = await Category.findAll({
            order: [['name', 'ASC']]
        });
        return categories;
    } catch (error) {
        throw error;
    }
};

const updateCategory = async (id, updateData) => {
    try {
        const [updatedCount] = await Category.update(
            { name: updateData.name, description: updateData.description },
            { where: { id } }
        );

        if (updatedCount && updatedCount > 0) {
            const updatedCategory = await Category.findByPk(id);
            return updatedCategory;
        }

        const err = new Error('Category not found.');
        err.status = 404;
        throw err;
    } catch (error) {
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A category with this name already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        const deletedCount = await Category.destroy({
            where: { id }
        });

        if (deletedCount && deletedCount > 0) {
            return true;
        }

        const err = new Error('Category not found.');
        err.status = 404;
        throw err;
    } catch (error) {
        throw error;
    }
};

const getCategoryById = async (id) => {
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            const err = new Error('Category not found.');
            err.status = 404;
            throw err;
        }
        return category;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoryById
};
