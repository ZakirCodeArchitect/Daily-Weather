// libraries
const express = require('express')
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const logMiddleware = require('./middleware/logMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

// imports
const app = express();

// environmental variables
const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB_UTL;

// middleware
app.use(express.json());    // for JSON Parsing
app.use(logMiddleware);     // for logging 

// routes

// MongoDB connection

// Error handling middleware - global
app.use(errorMiddleware);

// server
app.listen(PORT, () => {
    console.log(`Server Running on PORT : ${PORT}`);
})

