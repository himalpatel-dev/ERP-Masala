const Inventory = require('../models/inventory.model');
const ProductVariant = require('../models/product.model').ProductVariant;
const Product = require('../models/product.model').Product;
const Warehouse = require('../models/warehouse.model');

const createInventory = async (data) => {
    try {
        if (!data.variant_id) {
            const err = new Error("variant_id is required.");
            err.status = 400;
            throw err;
        }

        const inventory = await Inventory.create({
            variant_id: data.variant_id,
            warehouse_id: data.warehouse_id || null,
            mfg_date: data.mfg_date,
            expiry_date: data.expiry_date,
            qty_on_hand: data.qty_on_hand || 0,
            qty_reserved: data.qty_reserved || 0,
            cost_per_unit: data.cost_per_unit || 0
        });

        return inventory;

    } catch (error) {
        throw error;
    }
};

const getAllInventory = async () => {
    return await Inventory.findAll({
        include: [
            {
                model: ProductVariant,
                as: 'variant',
                include: [
                    {
                        model: Product,
                        as: 'product'
                    }
                ]
            },
            {
                model: Warehouse,
                as: 'warehouse'
            }
        ],
        order: [['createdAt', 'DESC']]
    });
};

const getInventoryById = async (inventory_id) => {
    const inventory = await Inventory.findByPk(inventory_id);
    if (!inventory) {
        const err = new Error("Inventory record not found.");
        err.status = 404;
        throw err;
    }
    return inventory;
};

const updateInventory = async (inventory_id, data) => {
    try {
        const [count] = await Inventory.update(data, {
            where: { inventory_id }
        });

        if (count === 0) {
            const err = new Error("Inventory record not found.");
            err.status = 404;
            throw err;
        }

        return await Inventory.findByPk(inventory_id);

    } catch (error) {
        throw error;
    }
};

const deleteInventory = async (inventory_id) => {
    const count = await Inventory.destroy({
        where: { inventory_id }
    });

    if (count === 0) {
        const err = new Error("Inventory record not found.");
        err.status = 404;
        throw err;
    }

    return true;
};

module.exports = {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};
