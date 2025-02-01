const User = require('../models/users')

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if the email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        // Create the new user document
        const newUser = new User({
            name,
            email,
            password, // Normally, you would hash the password here
        });

        // Save the user document to MongoDB
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Error creating user', error });
    }
}

module.exports = {
    addUser,
};