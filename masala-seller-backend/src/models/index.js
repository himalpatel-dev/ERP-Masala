const sequelize = require('../config/db.config');
const User = require('./user.model');
const Category = require('./category.model');
const SubCategory = require('./subcategory.model');
const Product = require('./product.model');
const Uom = require('./unitsofmeasure.model');
const Warehouse = require('./warehouse.model');
const Inventory = require('./inventory.model');
const { QueryTypes } = require('sequelize');


// Initialize the DB object
const db = {};

db.sequelize = sequelize;
db.User = User;
db.Category = Category;
db.SubCategory = SubCategory;
db.Product = Product.Product;
db.ProductVariant = Product.ProductVariant;
db.Uom = Uom;
db.Warehouse = Warehouse;
db.Inventory = Inventory;
db.ProductImage = Product.ProductImage;

db.ensureQtyAvailableColumn = async function () {
    try {
        const sequelize = db.sequelize;
        if (sequelize.getDialect() !== 'postgres') {
            console.warn('Skipping qty_available creation: not using Postgres.');
            return;
        }

        // Use SELECT query type to get an array of rows
        const rows = await sequelize.query("SHOW server_version_num;", { type: QueryTypes.SELECT });

        // rows should be an array of objects; take the first row
        const versionRow = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        const serverVersionNum = versionRow && (versionRow.server_version_num || versionRow.serverversionnum || versionRow.server_version)
            ? parseInt(versionRow.server_version_num || versionRow.serverversionnum || versionRow.server_version, 10)
            : null;

        if (!serverVersionNum) {
            console.warn('Could not determine Postgres server_version_num. Skipping generated column creation.');
            return;
        }

        const major = Math.floor(serverVersionNum / 10000);
        if (major < 12) {
            console.warn(`Postgres major version ${major} does not support generated stored columns (requires >= 12). Skipping creation.`);
            return;
        }

        const alterSql = `
      ALTER TABLE IF EXISTS tbl_inventory
      ADD COLUMN IF NOT EXISTS qty_available numeric(14,3)
      GENERATED ALWAYS AS (qty_on_hand - qty_reserved) STORED;
    `;

        await sequelize.query(alterSql);
        console.log('✅ Ensured qty_available generated column exists (or already present).');

    } catch (err) {
        // Log the full error for debugging; do not crash app by default
        console.error('⚠️ Failed to ensure qty_available column:', err && err.message ? err.message : err);
        // If you want to stop startup when this fails, uncomment the next line:
        // throw err;
    }
};

db.init = async function (options = { alter: true }) {
    // Authenticate first (will throw if DB down)
    await db.sequelize.authenticate();

    console.log('🔄 Attempting to drop qty_available column...');
    // Drop generated column if exists, to allow altering dependencies (qty_on_hand)
    try {
        await db.sequelize.query('ALTER TABLE IF EXISTS tbl_inventory DROP COLUMN IF EXISTS qty_available CASCADE;');
        console.log('✅ Dropped qty_available column (if it existed).');
    } catch (e) {
        console.warn('⚠️ Could not drop qty_available (ignoring):', e.message);
    }

    console.log('🔄 Syncing database...');
    // Sync models (creates/alter tables) — your existing behavior
    await db.sequelize.sync(options);

    // Ensure generated column exists after sync
    await db.ensureQtyAvailableColumn();
};

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

// 6. Inventory <-> ProductVariant (One Inventory has one ProductVariant)
db.Inventory.belongsTo(db.ProductVariant, { foreignKey: 'variant_id', as: 'variant' });
db.ProductVariant.hasMany(db.Inventory, { foreignKey: 'variant_id', as: 'inventories' });

// 7. Inventory <-> Warehouse (One Inventory has one Warehouse)
db.Inventory.belongsTo(db.Warehouse, { foreignKey: 'warehouse_id', as: 'warehouse' });
db.Warehouse.hasMany(db.Inventory, { foreignKey: 'warehouse_id', as: 'inventories' });

// 8. Product <-> ProductImage (New Relationship)
db.Product.hasMany(db.ProductImage, { foreignKey: 'productId', as: 'images' });
db.ProductImage.belongsTo(db.Product, { foreignKey: 'productId', as: 'product' });

module.exports = db;