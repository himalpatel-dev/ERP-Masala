const productService = require('../services/category.service');

const createCategory = async (req, res) => {
    try {
        const category = await productService.createCategory(req.body);
        res.status(201).json({
            message: 'Category created successfully!',
            category
        });
    } catch (error) {
        console.error('Category creation error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during category creation.' : error.message;
        res.status(status).json({ message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await productService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Fetch categories error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching categories.' : error.message;
        res.status(status).json({ message });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCategory = await productService.updateCategory(id, req.body);
        res.status(200).json({
            message: 'Category updated successfully!',
            category: updatedCategory
        });
    } catch (error) {
        console.error('Category update error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during category update.' : error.message;
        res.status(status).json({ message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await productService.deleteCategory(id);
        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (error) {
        console.error('Category deletion error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during category deletion.' : error.message;
        res.status(status).json({ message });
    }
};

// New: Get single category by id
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await productService.getCategoryById(id);
        res.status(200).json(category);
    } catch (error) {
        console.error('Get category by id error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching category.' : error.message;
        res.status(status).json({ message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoryById
};
