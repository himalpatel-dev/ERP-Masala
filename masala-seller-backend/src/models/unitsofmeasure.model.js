const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Uom = sequelize.define('Uom', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: 'tbl_unitsOfMeasure',
    timestamps: false // set true if you want createdAt/updatedAt
});

module.exports = Uom;