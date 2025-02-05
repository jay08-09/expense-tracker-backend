const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
require('colors')

const userRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes')
const expensesRoutes = require('./routes/expensesRoutes')
const incomeRoutes = require('./routes/incomeRoutes')
dotenv.config()

//connect to mongo db
connectDB()

const app = express()
const PORT = process.env.PORT

// ✅ Middleware (Important: Add before routes)
app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/expenses', expensesRoutes)
app.use('/api/incomes', incomeRoutes)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.yellow.bold);
});