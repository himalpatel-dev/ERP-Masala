const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const categoryController = require('../controllers/category.controller');
const subcategoryController = require('../controllers/subcategory.controller');
const verifyToken = require('../middlewares/auth.middleware');

// --- PROTECTED ADMIN ROUTES ---

router.post('/login', authController.Login);
router.post('/register', authController.register);


// --- PROTECTED ADMIN ROUTES (Category Management) ---

// CREATE Category
router.post('/categories', verifyToken, categoryController.createCategory);

// READ All Categories
router.get('/categories', verifyToken, categoryController.getAllCategories);

// READ Categories By ID
router.get('/categories/:id', verifyToken, categoryController.getCategoryById);

// UPDATE Category 
router.put('/categories/:id', verifyToken, categoryController.updateCategory);

// DELETE Category
router.delete('/categories/:id', verifyToken, categoryController.deleteCategory);


// --- PROTECTED ADMIN ROUTES (SubCategory Management) ---

// CREATE SubCategory
router.post('/subcategories', verifyToken, subcategoryController.createSubCategory);

// READ All SubCategories
router.get('/subcategories', verifyToken, subcategoryController.getAllSubCategories);

// READ SubCategory By ID
router.get('/subcategories/:id', verifyToken, subcategoryController.getSubCategoryById);

// UPDATE SubCategory
router.put('/subcategories/:id', verifyToken, subcategoryController.updateSubCategory);

// DELETE SubCategory
router.delete('/subcategories/:id', verifyToken, subcategoryController.deleteSubCategory);


module.exports = router;