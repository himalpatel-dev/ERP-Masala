const warehouseService = require('../services/warehouse..service');

// CREATE
const createWarehouse = async (req, res) => {
    try {
        const warehouse = await warehouseService.createWarehouse(req.body);
        res.status(201).json({
            message: "Warehouse created successfully!",
            warehouse
        });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

// READ ALL
const getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await warehouseService.getAllWarehouses();
        res.status(200).json(warehouses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ BY ID
const getWarehouseById = async (req, res) => {
    try {
        const warehouse = await warehouseService.getWarehouseById(req.params.warehouse_id);
        res.status(200).json(warehouse);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

// UPDATE
const updateWarehouse = async (req, res) => {
    try {
        const updated = await warehouseService.updateWarehouse(req.params.warehouse_id, req.body);
        res.status(200).json({
            message: "Warehouse updated successfully!",
            warehouse: updated
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

// DELETE
const deleteWarehouse = async (req, res) => {
    try {
        await warehouseService.deleteWarehouse(req.params.warehouse_id);
        res.status(200).json({ message: "Warehouse deleted successfully!" });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
};
