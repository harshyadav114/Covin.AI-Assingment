require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

connectDB();

app.use(express.json());
 
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
