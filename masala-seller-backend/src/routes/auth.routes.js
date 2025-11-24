const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const categoryController = require('../controllers/category.controller');
const subcategoryController = require('../controllers/subcategory.controller');
const uomController = require('../controllers/uom.controller');
const verifyToken = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');
const productVariantController = require('../controllers/productVariant.controller');

// --- PROTECTED ADMIN ROUTES ---

router.post('/login', authController.Login);
router.post('/register', authController.register);


// --- PROTECTED ADMIN ROUTES (UOM Management) ---

// CREATE UOM
router.post('/uoms', verifyToken, uomController.createUom);

// READ All UOMs
router.get('/uoms', verifyToken, uomController.getAllUoms);

// READ UOM By ID
router.get('/uoms/:id', verifyToken, uomController.getUomById);

// UPDATE UOM
router.put('/uoms/:id', verifyToken, uomController.updateUom);

// DELETE UOM
router.delete('/uoms/:id', verifyToken, uomController.deleteUom);


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


// --- PROTECTED ADMIN ROUTES (Product Management) ---

// CREATE Product
router.post('/products', verifyToken, productController.createProduct);

// READ All Products
router.get('/products', verifyToken, productController.getAllProducts);

// READ Product By ID
router.get('/products/:id', verifyToken, productController.getProductById);

// UPDATE Product
router.put('/products/:id', verifyToken, productController.updateProduct);

// DELETE Product
router.delete('/products/:id', verifyToken, productController.deleteProduct);


// --- PROTECTED ADMIN ROUTES (Product Variant Management) ---

// CREATE Product Variant
router.post('/product-variants', verifyToken, productVariantController.createVariant);

// READ All Product Variants
router.get('/product-variants', verifyToken, productVariantController.getAllVariants);

// READ Product Variant By ID
router.get('/product-variants/:id', verifyToken, productVariantController.getVariantById);

// UPDATE Product Variant
router.put('/product-variants/:id', verifyToken, productVariantController.updateVariant);

// DELETE Product Variant
router.delete('/product-variants/:id', verifyToken, productVariantController.deleteVariant);

module.exports = router;