const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Role = sequelize.define('Role', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true // ⬅️ No duplicate role names
    }
}, {
    tableName: 'tbl_user_roles',
    timestamps: false, // ⬅️ No createdAt/updatedAt (your SQL table doesn’t have them)
});

module.exports = Role;
