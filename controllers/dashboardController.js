const express = require("express");
const Expense = require("../models/expenses");
const Income = require("../models/income");
const Investment = require("../models/investments");
const Savings = require("../models/savings");
const mongoose = require("mongoose");

const getDashboardData = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        // Aggregate total expenses
        const totalExpenses = await Expense.aggregate([
            { $match: { userId, isDeleted: false } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Aggregate total income
        const totalIncome = await Income.aggregate([
            { $match: { userId, isDeleted: false } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Aggregate total savings
        const totalSavings = await Savings.aggregate([
            { $match: { userId, isDeleted: false } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Aggregate total investments
        const totalInvestments = await Investment.aggregate([
            { $match: { userId, isDeleted: false } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Monthly Expenses & Income (Grouped by Month)
        const monthlyExpenses = await Expense.aggregate([
            { $match: { userId, isDeleted: false } },
            { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } },
            { $sort: { "_id": 1 } }
        ]);

        const monthlyIncome = await Income.aggregate([
            { $match: { userId, isDeleted: false } },
            { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } },
            { $sort: { "_id": 1 } }
        ]);

       
        // Expense Distribution by Category (Pie Chart)
        const categoryDistribution = await Expense.aggregate([
            { $match: { userId, isDeleted: false } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } }
        ]);

        // Get last 5 transactions (Recent Activity)
        const recentTransactions = await Expense.find({ userId, isDeleted: false })
            .sort({ date: -1 })
            .limit(10)
            .select("category amount date");

        // Send response
        res.json({
            totalExpenses: totalExpenses[0]?.total || 0,
            totalIncome: totalIncome[0]?.total || 0,
            totalSavings: totalSavings[0]?.total || 0,
            totalInvestments: totalInvestments[0]?.total || 0,
            balance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
            monthlyExpenses,
            monthlyIncome,
            categoryDistribution,
            recentTransactions,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getDashboardData,
}
