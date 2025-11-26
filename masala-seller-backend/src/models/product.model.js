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


const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    // <--- ADD THIS GETTER BLOCK
    get() {
      const rawValue = this.getDataValue('imageUrl');
      if (!rawValue) return null;

      // If the value is already a full URL (like the Categories we seeded), return it as is
      if (rawValue.startsWith('http')) {
        return rawValue;
      }

      // Otherwise, prepend the server domain and uploads folder
      return `${process.env.BASE_URL}/uploads/${rawValue}`;
    }
    // <--- END GETTER BLOCK
  },
  isPrimary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'tbl_product_images',
  timestamps: false
});



module.exports = { Product, ProductVariant, ProductImage };
