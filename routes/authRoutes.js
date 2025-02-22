const express = require("express");
const { login, getProfile } = require("../controllers/authController")
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();
router.post('/login', login)
router.get('/profile', authMiddleware, getProfile)

module.exports = router;