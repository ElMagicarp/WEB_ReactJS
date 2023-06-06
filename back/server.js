require('dotenv').config();

const express = require('express');
const msg_routes = require('./middlewares/msg_routes.js');
const channel_routes = require('./middlewares/channel_routes.js');
const mongoose = require('mongoose');
const mongoString = process.env.MONGODB_URL;
const port = process.env.REACT_APP_BACK_PORT;

// Connect to MongoDB
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Connected to database');
})

// Express server
const app = express();

// Body parser
app.use(express.json());

// CORS definition
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + process.env.REACT_APP_FRONT_PORT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

// Routes
app.use('/api', msg_routes);
app.use('/api', channel_routes);
