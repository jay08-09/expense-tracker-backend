const Investment = require('../models/investments');

const createInvestments = async (req, res) => {
    try {
        const { type, amount, investedDate, expectedReturn, maturityDate, notes } = req.body;
        const newIncome = new Income({ userId: req.user.userId, type, amount, investedDate, expectedReturn, maturityDate, notes });
        await newIncome.save();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getInvestments = async (req, res) => {
    try {
        const investments = await Investment.find().populate('userId', 'name email');
        res.status(200).json(investments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getInvestmentsById = async (req, res) => {
    try {
        const investment = await Investment.findById(req.params.id).populate('userId', 'name email');
        if (!investment) return res.status(404).json({ message: 'investment not found' });
        res.status(200).json(investment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateInvestments = async (req, res) => {
    try {
        const investment = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('userId', 'name email');
        if (!investment) return res.status(404).json({ message: 'Investment not found' });
        res.status(200).json(investment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteInvestments = async (req, res) => {
    try {
        const investment = await Investment.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!investment) return res.status(404).json({ message: 'Investment not found' });
        res.status(200).json({ message: 'Investment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createInvestments,
    getInvestments,
    getInvestmentsById,
    updateInvestments,
    deleteInvestments
}