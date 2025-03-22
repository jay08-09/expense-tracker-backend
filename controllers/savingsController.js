const Savings = require('../models/savings');

const createSavings = async (req, res) => {
    try {
        const { amount, goal, savedDate, targetDate, notes } = req.body;
        const newSavings = new Savings({ userId: req.user.userId, amount, goal, savedDate, targetDate, notes });
        await newSavings.save();
        res.status(201).json(newSavings)
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getSavings = async (req, res) => {
    try {
        const saving = await Savings.find({ isDeleted: false }).populate('userId', 'name email');
        // Format date to "YYYY-MM-DD"
        const formattedSavings = saving?.map(save => ({
            ...save._doc,
            savedDate: save.savedDate ? new Date(save.savedDate).toISOString().split('T')[0] : null ,// Format date
            targetDate: save.targetDate ? new Date(save.targetDate).toISOString().split('T')[0] : null,// Format date
        }));
        res.status(200).json(formattedSavings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSavingsById = async (req, res) => {
    try {
        const saving = await Savings.findById(req.params.id).populate('userId', 'name email');
        if (!saving) return res.status(404).json({ message: 'Savings not found' });
        res.status(200).json(saving);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSavings = async (req, res) => {
    try {
        const saving = await Savings.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('userId', 'name email');
        if (!saving) return res.status(404).json({ message: 'Savings not found' });
        res.status(200).json(saving);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteSavings = async (req, res) => {
    try {
        const saving = await Savings.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!saving) return res.status(404).json({ message: 'Savings not found' });
        res.status(200).json({ message: 'Savings deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSavings,
    getSavings,
    getSavingsById,
    updateSavings,
    deleteSavings
}