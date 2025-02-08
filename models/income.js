const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required."] },
        source: { type: String, required: [true, "Income source is required."] }, // e.g., Salary, Freelancing, Investments
        amount: { type: Number, required: [true, "Income amount is required."] },
        date: { type: Date, required: [true, "Income date is required."], default: Date.now },
        notes: { type: String },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);
const Income = mongoose.model('Income', IncomeSchema);
module.exports = Income