const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // ⬅️ Ensures no two users share an email
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'customer'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active' // ⬅️ Default status is active
    }
}, {
    tableName: 'tbl_usermaster',
    timestamps: true,
});

module.exports = User;