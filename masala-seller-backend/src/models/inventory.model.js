const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Inventory = sequelize.define("Inventory", {
    inventory_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    mfg_date: {
        type: DataTypes.DATEONLY
    },
    expiry_date: {
        type: DataTypes.DATEONLY
    },
    qty_on_hand: {
        type: DataTypes.DECIMAL(14, 3),
        allowNull: false
    },
    qty_reserved: {
        type: DataTypes.DECIMAL(14, 3),
        allowNull: false
    },
    cost_per_unit: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "tbl_inventory",
    timestamps: true
});

module.exports = Inventory;
