const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/FootballDB")
.then(() => console.log("Connected to DB"))
.catch(console.error);

const football = require('./models/football.js');

app.get('/footballTeams', async (req, res) => {
    const footballTeams = await football.find();

    res.json(footballTeams);
});

app.listen(5000, () => console.log("Server started on port 5000"));