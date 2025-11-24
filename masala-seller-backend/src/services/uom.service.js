// services/uom.service.js
const db = require('../models');
const Uom = db.Uom;

const createUom = async (uomData) => {
    try {
        const { code, name } = uomData;

        if (!code) {
            const err = new Error('UOM code is required.');
            err.status = 400;
            throw err;
        }
        if (!name) {
            const err = new Error('UOM name is required.');
            err.status = 400;
            throw err;
        }

        const uom = await Uom.create({ code, name });
        return uom;
    } catch (error) {
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A UOM with this code already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const getAllUoms = async () => {
    try {
        const uoms = await Uom.findAll({
            order: [['code', 'ASC']]
        });
        return uoms;
    } catch (error) {
        throw error;
    }
};

const updateUom = async (id, updateData) => {
    try {
        const [updatedCount] = await Uom.update(
            { code: updateData.code, name: updateData.name },
            { where: { id } }
        );

        if (updatedCount && updatedCount > 0) {
            const updatedUom = await Uom.findByPk(id);
            return updatedUom;
        }

        const err = new Error('UOM not found.');
        err.status = 404;
        throw err;
    } catch (error) {
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A UOM with this code already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const deleteUom = async (id) => {
    try {
        const deletedCount = await Uom.destroy({
            where: { id }
        });

        if (deletedCount && deletedCount > 0) {
            return true;
        }

        const err = new Error('UOM not found.');
        err.status = 404;
        throw err;
    } catch (error) {
        throw error;
    }
};

const getUomById = async (id) => {
    try {
        const uom = await Uom.findByPk(id);
        if (!uom) {
            const err = new Error('UOM not found.');
            err.status = 404;
            throw err;
        }
        return uom;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUom,
    getAllUoms,
    updateUom,
    deleteUom,
    getUomById
};
