const sequelize = require('../config/db.config');
const User = require('./user.model');
const Role = require('./role.model');
const Category = require('./category.model');
const SubCategory = require('./subcategory.model');
const Product = require('./product.model');
const Uom = require('./unitsofmeasure.model');

// Initialize the DB object
const db = {};

db.sequelize = sequelize;
db.User = User;
db.Role = Role;
db.Category = Category;
db.SubCategory = SubCategory;
db.Product = Product;
db.Uom = Uom;

// =========================================
// DEFINE RELATIONSHIPS
// =========================================
// 1. Category <-> SubCategory (One Category has many SubCategories)
db.Category.hasMany(db.SubCategory, { foreignKey: 'categoryId', as: 'subcategories' });
db.SubCategory.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = db;