// libraries
const express = require('express')
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// Files
const logMiddleware = require('./middleware/logMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const weatherRoutes = require('./routes/weatherRouter.js');

// imports
const app = express();

// environmental variables
const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB_URL;

// middleware
app.use(express.json());    // for JSON Parsing
app.use(logMiddleware);     // for logging 

// routes
app.use("/weather",weatherRoutes);

// MongoDB connection
mongoose.connect(MONGO_DB)
.then(() => {
    console.log('MongoDB successfully connected.');
}).catch((err) => {
    console.error('Error connecting to MongoDB: ', err.message);
});

// Error handling middleware - global
app.use(errorMiddleware);

// server
app.listen(PORT, () => {
    const serverMessage = `[${new Date().toISOString()}] INFO: Server started on PORT: ${PORT}\n`;
    console.log(serverMessage.trim());

    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(__dirname, './logs/log.txt');
    fs.appendFile(filePath, serverMessage, (err) => {
        if(err)
        {
            console.error(`ERROR: Failed to write to log File`)
        }
    })
})

