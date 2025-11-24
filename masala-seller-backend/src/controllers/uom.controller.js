// controllers/uom.controller.js
const uomService = require('../services/uom.service');

const createUom = async (req, res) => {
    try {
        const uom = await uomService.createUom(req.body);
        res.status(201).json({
            message: 'UOM created successfully!',
            uom
        });
    } catch (error) {
        console.error('UOM creation error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during UOM creation.' : error.message;
        res.status(status).json({ message });
    }
};

const getAllUoms = async (req, res) => {
    try {
        const uoms = await uomService.getAllUoms();
        res.status(200).json(uoms);
    } catch (error) {
        console.error('Fetch UOMs error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching UOMs.' : error.message;
        res.status(status).json({ message });
    }
};

const updateUom = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUom = await uomService.updateUom(id, req.body);
        res.status(200).json({
            message: 'UOM updated successfully!',
            uom: updatedUom
        });
    } catch (error) {
        console.error('UOM update error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during UOM update.' : error.message;
        res.status(status).json({ message });
    }
};

const deleteUom = async (req, res) => {
    const { id } = req.params;
    try {
        await uomService.deleteUom(id);
        res.status(200).json({ message: 'UOM deleted successfully.' });
    } catch (error) {
        console.error('UOM deletion error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during UOM deletion.' : error.message;
        res.status(status).json({ message });
    }
};

const getUomById = async (req, res) => {
    const { id } = req.params;
    try {
        const uom = await uomService.getUomById(id);
        res.status(200).json(uom);
    } catch (error) {
        console.error('Get UOM by id error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching UOM.' : error.message;
        res.status(status).json({ message });
    }
};

module.exports = {
    createUom,
    getAllUoms,
    updateUom,
    deleteUom,
    getUomById
};
