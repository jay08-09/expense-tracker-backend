const express = require('express');
const { AddIncome, getAllIncomes, getIncomeById, updateIncome, deleteIncome } = require('../controllers/incomeController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/', authMiddleware, AddIncome)
router.get('/', authMiddleware, getAllIncomes)
router.get('/:id', authMiddleware, getIncomeById)
router.patch('/:id', authMiddleware, updateIncome)
router.delete('/:id', authMiddleware, deleteIncome)

module.exports = router;