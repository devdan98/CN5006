// dotenv is a package that allows privacy over sensitive information (Port, mongo url etc)
require('dotenv').config();

const express = require('express');
const footballRoutes = require('./routes/footballTeams');
const mongoose = require('mongoose');

// Our express app
const app = express();

// Middleware (code executing between us getting a request and us sending a response)
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
//New hello

// Routes - To see all the teams visit localhost:5000/teams
app.use('/teams', footballRoutes);

// Connect to the DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        });
    })
    .catch((error) => {
        console.log(error)
    });

// Listen for requests
