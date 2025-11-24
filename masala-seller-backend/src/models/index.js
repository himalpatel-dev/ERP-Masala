const sequelize = require('../config/db.config');
const User = require('./user.model');
const Category = require('./category.model');
const SubCategory = require('./subcategory.model');
const Product = require('./product.model');
const Uom = require('./unitsofmeasure.model');

// Initialize the DB object
const db = {};

db.sequelize = sequelize;
db.User = User;
db.Category = Category;
db.SubCategory = SubCategory;
db.Product = Product.Product;
db.ProductVariant = Product.ProductVariant;
db.Uom = Uom;

// =========================================
// DEFINE RELATIONSHIPS
// =========================================
// 1. Category <-> SubCategory (One Category has many SubCategories)
db.Category.hasMany(db.SubCategory, { foreignKey: 'categoryId', as: 'subcategories' });
db.SubCategory.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

// 2. Category <-> Product
db.Category.hasMany(db.Product, { foreignKey: 'categoryId', as: 'products' });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

// 3. SubCategory <-> Product (One SubCategory has many Products)
db.SubCategory.hasMany(db.Product, { foreignKey: 'subCategoryId', as: 'products' });
db.Product.belongsTo(db.SubCategory, { foreignKey: 'subCategoryId', as: 'subcategory' });

// 4. Product <-> Uom (One Product has one Uom)
db.ProductVariant.belongsTo(db.Product, { foreignKey: 'productId', as: 'product' });
db.Product.hasMany(db.ProductVariant, { foreignKey: 'productId', as: 'variants' });

// 5. Product <-> Uom (One Product has one Uom)
db.ProductVariant.belongsTo(db.Uom, { foreignKey: 'uomId', as: 'uom' });
db.Uom.hasMany(db.ProductVariant, { foreignKey: 'uomId', as: 'products' });

module.exports = db;