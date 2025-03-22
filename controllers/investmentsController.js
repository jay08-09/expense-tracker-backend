const Investment = require('../models/investments');

const createInvestments = async (req, res) => {
    try {
        const { type, amount, investedDate, expectedReturn, maturityDate, notes } = req.body;
        const newInvestment = new Investment({ userId: req.user.userId, type, amount, investedDate, expectedReturn, maturityDate, notes });
        await newInvestment.save();
        res.status(201).json(newInvestment)
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getInvestments = async (req, res) => { 
    try {
        const investments = await Investment.find({ isDeleted: false }).populate('userId', 'name email');
        // Format date to "YYYY-MM-DD"
        const formattedInvestments = investments?.map(item => ({
            ...item._doc,
            investedDate: item.investedDate ? new Date(item.investedDate).toISOString().split('T')[0] : null,// Format date
            maturityDate: item.maturityDate ? new Date(item.maturityDate).toISOString().split('T')[0] : null // Format date
        }));

        res.status(200).json(formattedInvestments);

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