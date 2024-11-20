require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const pollRoutes = require("./router/polls")
const userRoutes = require("./router/user")
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    next();
});
app.use('/api/polls', pollRoutes);
app.use('/api/user', userRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT_NO, () => {
        console.log(`Backend service listening on ${process.env.PORT_NO}`)
    })
}).catch((err) => {
    console.log("Failed to connect to database")
})
