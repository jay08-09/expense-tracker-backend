const express = require('express');
const { addExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense } = require('../controllers/expensesController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/', authMiddleware, addExpense)
router.get('/', authMiddleware, getAllExpenses)
router.get('/:id', authMiddleware, getExpenseById)
router.patch('/:id', authMiddleware, updateExpense)
router.delete('/:id', authMiddleware, deleteExpense)

module.exports = router