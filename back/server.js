require('dotenv').config();

const express = require('express');
const msg_routes = require('./middlewares/msg_routes.js');
const mongoose = require('mongoose');
const mongoString = process.env.MONGODB_URL;
const port = 3000;

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
app.use(express.json());
//app.use(bodyParser.urlencoded({extended: false}))
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

app.use('/api', msg_routes);