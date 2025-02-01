const User = require("../models/users"); // Adjust path as needed
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        } 

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })

        res.json({ token, user: { id: user._id, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = {
    login,
};