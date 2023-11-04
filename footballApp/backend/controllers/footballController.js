const footballTeam = require('../models/footballModel')

// GET all teams
const getFootballTeams = async (req, res) => {
    const footballTeams = await footballTeam.find({}).sort({team: -1});

    res.status(200).json(footballTeams);
}

// GET a single team
const getFootballTeam = async (req, res) => {
    const { id } = req.params;

    const footballTeam = await footballTeam.findById(id);

    if (!footballTeam) {
        return res.status(404).json({error: 'Team does not exist'})
    }

    res.status(200).json(footballTeam);
}

// POST new team
const createFootballTeam = async (req, res) => {
    const {
        team, gamesPlayed, wins, draw, loss, goalsFor, goalsAgainst, points, year
    } = req.body;

    // Adding the entry to database
    try {
        const football = await footballTeam.create({
            team, gamesPlayed, wins, draw, loss, goalsFor, goalsAgainst, points, year
        })
        res.status(200).json(football);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a team


// UPDATE a team


module.exports = {
    createFootballTeam,
    getFootballTeams,
    getFootballTeam
}