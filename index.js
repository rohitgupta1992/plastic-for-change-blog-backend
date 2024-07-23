// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

// Connect to MongoDB
connectDB();


const app = express();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors())
app.get('/',(req,res)=>{
    res.status(200).json({mes:"server on"})
})
// Routes
app.use('/api/users', require('./routes/auth'));
app.use('/api/users', require('./routes/blog'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
