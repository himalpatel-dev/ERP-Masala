const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Batch = sequelize.define("Batch", {
    batch_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    batch_code: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    total_qty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    mfg_date: {
        type: DataTypes.DATEONLY
    },
    expiry_date: {
        type: DataTypes.DATEONLY
    }
}, {
    tableName: "tbl_batches",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["variant_id", "batch_code"]
        }
    ]
});

module.exports = Batch;
