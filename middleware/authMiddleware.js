const jwt = require('jsonwebtoken')
const User = require('../models/users')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId); // Fetch user from DB
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isBlocked) { // Check if user is blocked
            return res.status(403).json({ message: 'Access denied, you have been blocked' });
        }
        req.user = decoded
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;