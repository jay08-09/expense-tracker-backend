const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization')
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    const token = authHeader.split(' ')[1]
    console.log("Extracted Token:", token); // Debugging
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded User:", decoded); // Debugging
        req.user = decoded
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;