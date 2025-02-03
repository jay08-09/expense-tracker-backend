const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required."] },
        type: { type: String, required: [true, "Investment type is required."] }, // e.g., Stocks, Mutual Funds, Crypto
        amount: { type: Number, required: [true, "Investment amount is required."] },
        investedDate: { type: Date, default: Date.now, required: [true, "Investment Date is required."] },
        expectedReturn: { type: Number }, // Expected return percentage
        maturityDate: { type: Date }, // When the investment matures
        notes: { type: String },
    },
    {
        timestamps: true,
    }
);
const Investments = mongoose.model('Investments', InvestmentSchema)
module.exports = Investments
