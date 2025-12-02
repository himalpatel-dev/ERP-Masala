// services/productVariant.service.js
const db = require('../models');
const ProductVariant = db.ProductVariant;
const Product = db.Product;
const Category = db.Category;
const SubCategory = db.SubCategory;

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

//mkae this like get data from product also that prodcut name from productid

const getAllVariantsProductwise = async () => {
    try {
        const variants = await ProductVariant.findAll({
            attributes: [
                'variant_id',
                'variant_code',
                'barcode',
                'net_content',
                'productId',
                [db.sequelize.col('product.category.name'), 'category'],
                [db.sequelize.col('product.subcategory.name'), 'subcategory'],
                [db.sequelize.col('product.name'), 'productname'],
                [db.sequelize.col('product.description'), 'description'],
                [db.sequelize.literal(`"ProductVariant"."pack_weight" || ' ' || "uom"."name"`), 'pack_with_unit']
            ],
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: [],
                    include: [
                        { model: Category, as: 'category', attributes: [] },
                        { model: SubCategory, as: 'subcategory', attributes: [] }
                    ]
                },
                {
                    model: db.Uom,
                    as: 'uom',
                    attributes: []
                }
            ],
            raw: true
        });

        return variants;
    } catch (error) {
        // optionally log error here
        throw error;
    }
};

module.exports = {
    createVariant,
    getAllVariants,
    getAllVariantsProductwise,
    getVariantById,
    updateVariant,
    deleteVariant
};
