const Income = require('../models/income')

const AddIncome = async (req, res) => {
    try {
        const { source, amount, date, notes } = req.body;
        const newIncome = new Income({ userId: req.user.userId, source, amount, date, notes });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().populate('userId', 'name email');
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getIncomeById = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id).populate('userId', 'name email');
        if (!income) return res.status(404).json({ message: 'Income not found' });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateIncome = async (req, res) => {
    try {
        const income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('userId', 'name email');
        if (!income) return res.status(404).json({ message: 'Income not found' });
        res.status(200).json(income);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteIncome = async (req, res) => {
    try {
        const income = await Income.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!income) return res.status(404).json({ message: 'Income not found' });
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    AddIncome,
    getAllIncomes,
    getIncomeById,
    updateIncome,
    deleteIncome,
}