const express = require('express');
const { createSavings, getSavings, getSavingsById, updateSavings, deleteSavings } = require('../controllers/savingsController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/', authMiddleware, createSavings)
router.get('/', authMiddleware, getSavings)
router.get('/:id', authMiddleware, getSavingsById)
router.patch('/:id', authMiddleware, updateSavings)
router.delete('/:id', authMiddleware, deleteSavings)

module.exports = router;