const express = require('express');
const { createInvestments, getInvestments, getInvestmentsById, updateInvestments, deleteInvestments } = require('../controllers/investmentsController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, createInvestments)
router.get('/', authMiddleware, getInvestments)
router.get('/:id', authMiddleware, getInvestmentsById)
router.get('/:id', authMiddleware, updateInvestments)
router.delete('/', authMiddleware, deleteInvestments)

module.exports = router
