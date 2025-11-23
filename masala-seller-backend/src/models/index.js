const sequelize = require('../config/db.config');
const User = require('./user.model');
const Role = require('./role.model');
const Category = require('./category.model');
const SubCategory = require('./subcategory.model');

// Initialize the DB object
const db = {};

db.sequelize = sequelize;
db.User = User;
db.Role = Role;
db.Category = Category;
db.SubCategory = SubCategory;
// We will add relationships here later (e.g., db.User.hasMany(db.Product))

module.exports = db;