const batchService = require('../services/batch.service');

// CREATE
const createBatch = async (req, res) => {
    try {
        const batch = await batchService.createBatch(req.body);
        res.status(201).json({
            message: 'Batch created successfully!',
            batch
        });
    } catch (error) {
        console.error('Batch creation error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during batch creation.' : error.message;
        res.status(status).json({ message });
    }
};

// READ ALL
const getAllBatches = async (req, res) => {
    try {
        const batches = await batchService.getAllBatches();
        res.status(200).json(batches);
    } catch (error) {
        console.error('Fetch batches error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching batches.' : error.message;
        res.status(status).json({ message });
    }
};

// READ BY ID
const getBatchById = async (req, res) => {
    const { batch_id } = req.params;
    try {
        const batch = await batchService.getBatchById(batch_id);
        res.status(200).json(batch);
    } catch (error) {
        console.error('Get batch by id error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error fetching batch.' : error.message;
        res.status(status).json({ message });
    }
};

// UPDATE
const updateBatch = async (req, res) => {
    const { batch_id } = req.params;
    try {
        const updated = await batchService.updateBatch(batch_id, req.body);
        res.status(200).json({
            message: 'Batch updated successfully!',
            batch: updated
        });
    } catch (error) {
        console.error('Batch update error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during batch update.' : error.message;
        res.status(status).json({ message });
    }
};

// DELETE
const deleteBatch = async (req, res) => {
    const { batch_id } = req.params;
    try {
        await batchService.deleteBatch(batch_id);
        res.status(200).json({ message: 'Batch deleted successfully.' });
    } catch (error) {
        console.error('Batch deletion error:', error);
        const status = error.status || 500;
        const message = (status === 500) ? 'Server error during batch deletion.' : error.message;
        res.status(status).json({ message });
    }
};

module.exports = {
    createBatch,
    getAllBatches,
    getBatchById,
    updateBatch,
    deleteBatch
};
