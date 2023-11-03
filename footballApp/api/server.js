const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/FootballDB")
.then(() => console.log("Connected to DB"))
.catch(console.error);

const football = require('./models/football');

app.get('/footballTeams', async (req, res) => {
    const footballTeams = await football.find();

    res.json(footballTeams);
});

// If we ever wanted to add another team to the DB
app.post('/footballScores/new', async (req, res) => {
    const footballScores = new football({
        team: req.body.team,
        gamesPlayed: req.body.gamesPlayed,
        wins: req.body.wins,
        draw: req.body.draw,
        loss: req.body.loss,
        goalsFor: req.body.goalsFor,
        goalsAgainst: req.body.goalsAgainst,
        points: req.body.points,
        year: req.body.year
    });

    footballScores.save();

    res.json(footballScores);
    
})

app.listen(5000, () => console.log("Server started on port 5000"));