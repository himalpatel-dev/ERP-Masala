// controllers/subcategoryController.js

const subcategoryService = require('../services/subcategory.service');

const createSubCategory = async (req, res) => {
    try {
        const sub = await subcategoryService.createSubCategory(req.body);
        res.status(201).json(sub);
    } catch (error) {
        const status = error.status || 500;
        const message = status === 500 ? error.message : error.message;
        res.status(status).json({ message });
    }
};

const getAllSubCategories = async (req, res) => {
    try {
        const data = await subcategoryService.getAllSubCategories();
        res.status(200).json(data);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

const getSubCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const sub = await subcategoryService.getSubCategoryById(id);
        res.status(200).json(sub);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

const updateSubCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await subcategoryService.updateSubCategory(id, req.body);
        res.status(200).json({ message: 'SubCategory updated', sub: updated });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

const deleteSubCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await subcategoryService.deleteSubCategory(id);
        res.status(200).json({ message: 'SubCategory deleted' });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
};
