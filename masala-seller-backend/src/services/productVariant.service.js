// services/productVariant.service.js
const db = require('../models');
const ProductVariant = db.ProductVariant;

const createVariant = async (variantData) => {
    try {
        const { variant_code, productId, pack_weight, uomId, barcode, net_content, isActive } = variantData;

        if (!variant_code) {
            const err = new Error('Variant code is required.');
            err.status = 400;
            throw err;
        }
        if (!productId && !variantData.productId) {
            const err = new Error('productId (or productId) is required.');
            err.status = 400;
            throw err;
        }

        const variant = await ProductVariant.create({
            variant_code,
            productId,
            pack_weight,
            uomId,
            barcode,
            net_content,
            isActive
        });

        return variant;
    } catch (error) {
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A variant with this code already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const getAllVariants = async () => {
    try {
        const variants = await ProductVariant.findAll({
            order: [['variant_code', 'ASC']]
        });
        return variants;
    } catch (error) {
        throw error;
    }
};

const getVariantById = async (variant_id) => {
    try {
        const variant = await ProductVariant.findByPk(variant_id);
        if (!variant) {
            const err = new Error('Variant not found.');
            err.status = 404;
            throw err;
        }
        return variant;
    } catch (error) {
        throw error;
    }
};

const updateVariant = async (variant_id, updateData) => {
    try {
        const [updatedCount] = await ProductVariant.update(
            {
                variant_code: updateData.variant_code,
                pack_weight: updateData.pack_weight,
                barcode: updateData.barcode,
                net_content: updateData.net_content,
                isActive: updateData.isActive,
                unit_id: updateData.unit_id,
                product_id: updateData.product_id
            },
            { where: { variant_id } }
        );

        if (updatedCount && updatedCount > 0) {
            const updated = await ProductVariant.findByPk(variant_id);
            return updated;
        }

        const err = new Error('Variant not found.');
        err.status = 404;
        throw err;
    } catch (error) {
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A variant with this code already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const deleteVariant = async (variant_id) => {
    try {
        const deletedCount = await ProductVariant.destroy({ where: { variant_id } });
        if (deletedCount && deletedCount > 0) return true;

        const err = new Error('Variant not found.');
        err.status = 404;
        throw err;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createVariant,
    getAllVariants,
    getVariantById,
    updateVariant,
    deleteVariant
};
