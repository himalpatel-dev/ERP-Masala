const inventoryService = require('../services/inventory.service');

// CREATE
const createInventory = async (req, res) => {
    try {
        const record = await inventoryService.createInventory(req.body);
        res.status(201).json({
            message: "Inventory record created successfully!",
            inventory: record
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

// READ ALL
const getAllInventory = async (req, res) => {
    try {
        const records = await inventoryService.getAllInventory();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ BY ID
const getInventoryById = async (req, res) => {
    try {
        const record = await inventoryService.getInventoryById(req.params.inventory_id);
        res.status(200).json(record);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

// UPDATE
const updateInventory = async (req, res) => {
    try {
        const updated = await inventoryService.updateInventory(req.params.inventory_id, req.body);
        res.status(200).json({
            message: "Inventory record updated successfully!",
            inventory: updated
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

// DELETE
const deleteInventory = async (req, res) => {
    try {
        await inventoryService.deleteInventory(req.params.inventory_id);
        res.status(200).json({ message: "Inventory record deleted successfully!" });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};
