const mongoose = require("mongoose");

const SavingsSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required."] },
        amount: { type: Number, required: [true, "Savings amount is required."] },
        goal: { type: String }, // e.g., Emergency Fund, Vacation
        savedDate: { type: Date, default: Date.now },
        targetDate: { type: Date },
        notes: { type: String },
    },
    {
        timestamps: true,
    }
);
const Savings = mongoose.model('Savings', SavingsSchema)
module.exports = Savings
