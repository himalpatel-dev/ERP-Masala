const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Warehouse = sequelize.define('Warehouse', {
    warehouse_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(32),
        unique: true,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'tbl_warehouses',
    timestamps: false
});

module.exports = Warehouse;
