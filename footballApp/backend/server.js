// dotenv is a package that allows privacy over sensitive information (Port, mongo url etc)
require('dotenv').config()

const express = require('express');
const footballRoutes = require('./routes/footballTeams');

const mongoose = require('mongoose');
const cors = require('cors');

// Our express app
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://cn5006cw:CN5006makesmesick@footballdb.hmeyce0.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("Connected to DB"))
.catch(console.error);

const football = require('./models/football');

// Middleware (code executing between us getting a request and us sending a response)
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/football', footballRoutes);

// app.get('/footballTeams', async (req, res) => {
//     const footballTeams = await football.find();

//     res.json(footballTeams);
// });

// // If we ever wanted to add another team to the DB
// app.post('/footballCollection/new', async (req, res) => {
//     const footballCollection = new football({
//         team: req.body.team,
//         gamesPlayed: req.body.gamesPlayed,
//         wins: req.body.wins,
//         draw: req.body.draw,
//         loss: req.body.loss,
//         goalsFor: req.body.goalsFor,
//         goalsAgainst: req.body.goalsAgainst,
//         points: req.body.points,
//         year: req.body.year
//     });

//     footballCollection.save();

//     res.json(footballCollection);
    
// });

// // Deleting teams by id number
// app.delete('/footballCollection/delete/:id', async (req, res) => {
//     const result = await football.findByIdAndDelete(req.params.id);

//     res.json(result);
// });

// Listen for requests
app.listen(process.env.PORT, () => console.log("Server started on port 5000"));