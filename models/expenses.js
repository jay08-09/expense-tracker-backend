const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required."] },
        category: { type: String, required: [true, "Expense category is required."] }, // e.g., Food, Travel, Bills
        amount: { type: Number, required: [true, "Expense amount is required."] },
        date: { type: Date, required: [true, "Expense date is required."], default: Date.now },
        paymentMethod: {
            type: String,
            enum: {
                values: ["Cash", "Card", "UPI", "Other"],
                message: "Invalid payment method. Choose from: Cash, Card, UPI, Other."
            },
            required: [true, "Payment method is required."]
        },
        notes: { type: String },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
)

const Expenses = mongoose.model('Expenses', ExpenseSchema)
module.exports = Expenses