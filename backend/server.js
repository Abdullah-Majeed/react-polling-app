require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const pollRoutes = require("./router/polls")
const userRoutes = require("./router/user")
const cors = require('cors')
const app = express();

// CORS MIDDLEWARE
app.use(cors());

// Convert JSON data and Limit for payload data 10 mb
app.use(express.json({ limit: '10mb' }));

// MIDDLEWARE
app.use((req, res, next) => {
    next();
});

// ROUTES
app.use('/api/user', userRoutes);
app.use('/api/polls', pollRoutes);

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT_NO, () => {
        console.log(`Backend service listening on ${process.env.PORT_NO}`);
    })
}).catch((error) => {
    console.log("Failed to connect to database", error);
})
