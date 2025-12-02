// controllers/productVariant.controller.js
const variantService = require('../services/productVariant.service');

const createVariant = async (req, res) => {
    try {
        const variant = await variantService.createVariant(req.body);
        res.status(201).json({
            message: 'Variant created successfully!',
            variant
        });
    } catch (error) {
        console.error('Variant creation error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during variant creation.' : error.message;
        res.status(status).json({ message });
    }
};

const getAllVariants = async (req, res) => {
    try {
        const variants = await variantService.getAllVariants();
        res.status(200).json(variants);
    } catch (error) {
        console.error('Fetch variants error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching variants.' : error.message;
        res.status(status).json({ message });
    }
};

const getVariantById = async (req, res) => {
    const { variant_id } = req.params;
    console.log(variant_id);

    try {
        const variant = await variantService.getVariantById(variant_id);
        res.status(200).json(variant);
    } catch (error) {
        console.error('Get variant by id error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching variant.' : error.message;
        res.status(status).json({ message });
    }
};

const updateVariant = async (req, res) => {
    const { variant_id } = req.params;
    try {
        const updated = await variantService.updateVariant(variant_id, req.body);
        res.status(200).json({
            message: 'Variant updated successfully!',
            variant: updated
        });
    } catch (error) {
        console.error('Variant update error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during variant update.' : error.message;
        res.status(status).json({ message });
    }
};

const deleteVariant = async (req, res) => {
    const { variant_id } = req.params;
    try {
        await variantService.deleteVariant(variant_id);
        res.status(200).json({ message: 'Variant deleted successfully.' });
    } catch (error) {
        console.error('Variant deletion error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during variant deletion.' : error.message;
        res.status(status).json({ message });
    }
};

const getAllVariantsProductwise = async (req, res) => {
    try {
        const variants = await variantService.getAllVariantsProductwise();
        res.status(200).json(variants);
    } catch (error) {
        console.error('Fetch variants error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching variants.' : error.message;
        res.status(status).json({ message });
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
