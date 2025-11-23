// services/subcategory.service.js

const db = require('../models');
const SubCategory = db.SubCategory;

const createSubCategory = async (data) => {
    try {
        let { name, categoryId, image } = data;
        if (!image) {
            image = `https://placehold.co/200x200?text=${name}`;
        }

        const sub = await SubCategory.create({ name, categoryId, image, isActive: true });
        return sub;
    } catch (error) {
        throw error;
    }
};

const getAllSubCategories = async () => {
    try {
        const data = await SubCategory.findAll({ include: ['category'] });
        return data;
    } catch (error) {
        throw error;
    }
};

const getSubCategoryById = async (id) => {
    try {
        const sub = await SubCategory.findByPk(id, { include: ['category'] });
        if (!sub) {
            const err = new Error('SubCategory not found');
            err.status = 404;
            throw err;
        }
        return sub;
    } catch (error) {
        throw error;
    }
};

const updateSubCategory = async (id, updateData) => {
    try {
        const sub = await SubCategory.findByPk(id);
        if (!sub) {
            const err = new Error('SubCategory not found');
            err.status = 404;
            throw err;
        }

        const { name, categoryId, isActive, image } = updateData;
        await sub.update({ name, categoryId, isActive, image });

        // reload with association included
        const updated = await SubCategory.findByPk(id, { include: ['category'] });
        return updated;
    } catch (error) {
        throw error;
    }
};

const deleteSubCategory = async (id) => {
    try {
        const sub = await SubCategory.findByPk(id);
        if (!sub) {
            const err = new Error('SubCategory not found');
            err.status = 404;
            throw err;
        }

        await sub.destroy();
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
};
