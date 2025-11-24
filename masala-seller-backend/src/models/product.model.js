const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Product = sequelize.define('Product', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  productCode: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'tbl_product_master',
  timestamps: true,
});


const ProductVariant = sequelize.define('ProductVariant', {
  variant_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  variant_code: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true
  },
  pack_weight: {
    type: DataTypes.DECIMAL(12, 3),
    allowNull: true
  },
  barcode: {
    type: DataTypes.STRING(64),
    allowNull: true
  },
  net_content: {
    type: DataTypes.STRING(64),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'tbl_product_variants',
  timestamps: true,
});


module.exports = { Product, ProductVariant };
