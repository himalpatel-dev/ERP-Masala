const Batch = require('../models/batch.model'); // adjust path if needed

const createBatch = async (data) => {
    try {
        // basic validation
        if (!data.variant_id) {
            const err = new Error('variant_id is required.');
            err.status = 400;
            throw err;
        }
        if (!data.batch_code) {
            const err = new Error('batch_code is required.');
            err.status = 400;
            throw err;
        }

        const batch = await Batch.create({
            variant_id: data.variant_id,
            batch_code: data.batch_code,
            total_qty: data.total_qty,
            mfg_date: data.mfg_date,
            expiry_date: data.expiry_date
        });

        return batch;
    } catch (error) {
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A batch with this variant and batch_code already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const getAllBatches = async () => {
    try {
        return await Batch.findAll({
            order: [['createdAt', 'DESC']]
        });
    } catch (error) {
        throw error;
    }
};

const getBatchById = async (batch_id) => {
    try {
        const batch = await Batch.findByPk(batch_id);
        if (!batch) {
            const err = new Error('Batch not found.');
            err.status = 404;
            throw err;
        }
        return batch;
    } catch (error) {
        throw error;
    }
};

const updateBatch = async (batch_id, data) => {
    try {
        const [count] = await Batch.update(
            {
                // only update allowed fields
                batch_code: data.batch_code,
                total_qty: data.total_qty,
                mfg_date: data.mfg_date,
                expiry_date: data.expiry_date,
                variant_id: data.variant_id
            },
            { where: { batch_id } }
        );

        if (count === 0) {
            const err = new Error('Batch not found.');
            err.status = 404;
            throw err;
        }

        const updated = await Batch.findByPk(batch_id);
        return updated;
    } catch (error) {
        if (error && error.name === 'SequelizeUniqueConstraintError') {
            const err = new Error('A batch with this variant and batch_code already exists.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
};

const deleteBatch = async (batch_id) => {
    try {
        const count = await Batch.destroy({ where: { batch_id } });
        if (count === 0) {
            const err = new Error('Batch not found.');
            err.status = 404;
            throw err;
        }
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createBatch,
    getAllBatches,
    getBatchById,
    updateBatch,
    deleteBatch
};
