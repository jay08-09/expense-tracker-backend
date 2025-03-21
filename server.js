const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')
require('colors')

const userRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes')
const expensesRoutes = require('./routes/expensesRoutes')
const incomeRoutes = require('./routes/incomeRoutes')
const investmentRoutes = require('./routes/investmentsRoutes')
const savingsRoutes = require('./routes/savingsRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

dotenv.config()

//connect to mongo db
connectDB()

const app = express()
const PORT = process.env.PORT

// ✅ Middleware (Important: Add before routes)
app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// OR Allow all origins (Not recommended for production)
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/expenses', expensesRoutes)
app.use('/api/incomes', incomeRoutes)
app.use('/api/investments', investmentRoutes)
app.use('/api/savings', savingsRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.yellow.bold);
});