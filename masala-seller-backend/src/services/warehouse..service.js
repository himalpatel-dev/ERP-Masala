const Warehouse = require('../models/warehouse.model');

const createWarehouse = async (data) => {
    try {
        if (!data.name) {
            const err = new Error("Warehouse name is required.");
            err.status = 400;
            throw err;
        }

        const warehouse = await Warehouse.create(data);
        return warehouse;

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            const err = new Error("Warehouse code already exists.");
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const getAllWarehouses = async () => {
    return await Warehouse.findAll({
        order: [["name", "ASC"]]
    });
};

const getWarehouseById = async (warehouse_id) => {
    const warehouse = await Warehouse.findByPk(warehouse_id);
    if (!warehouse) {
        const err = new Error("Warehouse not found.");
        err.status = 404;
        throw err;
    }
    return warehouse;
};

const updateWarehouse = async (warehouse_id, data) => {
    try {
        const [count] = await Warehouse.update(data, { where: { warehouse_id: warehouse_id } });

        if (count === 0) {
            const err = new Error("Warehouse not found.");
            err.status = 404;
            throw err;
        }

        return await Warehouse.findByPk(warehouse_id);

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            const err = new Error("Warehouse code already exists.");
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const deleteWarehouse = async (warehouse_id) => {
    const count = await Warehouse.destroy({ where: { warehouse_id: warehouse_id } });

    if (count === 0) {
        const err = new Error("Warehouse not found.");
        err.status = 404;
        throw err;
    }

    return true;
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
};
