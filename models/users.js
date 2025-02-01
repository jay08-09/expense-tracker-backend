const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        trim: true, // Removes extra spaces from the beginning and end
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Regex to validate email format
            'Please provide a valid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [6, 'Password must be at least 6 characters long!'],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
})
// Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (error) {
        next(error);
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;