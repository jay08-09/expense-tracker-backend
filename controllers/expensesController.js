const Expense = require('../models/expenses')

const addExpense = async (req, res) => {
    try {
        const { category, amount, date, paymentMethod, notes } = req.body;
        const expense = new Expense({
            userId: req.user.userId, // Automatically assign userId from token
            category,
            amount,
            date,
            paymentMethod,
            notes
        });

        await expense.save()
        res.status(201).json(expense)
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ isDeleted: false }).populate('userId', 'name email')

        // Format date to "YYYY-MM-DD"
        const formattedExpenses = expenses?.map(expense => ({
            ...expense._doc,
            date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : null // Format date
        }));

        res.status(200).json(formattedExpenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id).populate('userId', 'name email');
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('userId', 'name email');
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
}