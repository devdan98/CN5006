const footballTeamModel = require('../models/footballModel');
const mongoose = require('mongoose');

// GET all teams
const getFootballTeams = async (req, res) => {
    const footballTeams = await footballTeamModel.find({}).sort({team: -1});

    res.status(200).json(footballTeams);
}


// GET a single team
const getFootballTeam = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Team does not exist'})
    }

    const footballTeamById = await footballTeamModel.findById(id);

    if (!footballTeamById) {
        return res.status(404).json({error: 'Team does not exist'})
    }

    res.status(200).json(footballTeamById);
}

// POST new team
const createFootballTeam = async (req, res) => {
    const {
        team, gamesPlayed, wins, draw, loss, goalsFor, goalsAgainst, points, year
    } = req.body;

    let emptyFields = []

    if (!team) {
      emptyFields.push('team')
    }
    if (!gamesPlayed) {
      emptyFields.push('gamesPlayed')
    }
    if (!wins) {
      emptyFields.push('wins')
    }
    if (!draw) {
        emptyFields.push('draw')
      }
    if (!loss) {
        emptyFields.push('loss')
      }
      if (!goalsFor) {
        emptyFields.push('goalsFor')
      }
      if (!goalsAgainst) {
        emptyFields.push('goalsAgainst')
      }
      if (!points) {
        emptyFields.push('points')
      }
      if (!year) {
        emptyFields.push('year')
      }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // Adding the entry to database
    try {
        const football = await footballTeamModel.create({
            team, gamesPlayed, wins, draw, loss, goalsFor, goalsAgainst, points, year
        })
        res.status(200).json(football);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a team
const deleteFootballTeam = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Team does not exist'})
    }

    const footballTeam = await footballTeamModel.findOneAndDelete({_id: id});

    if (!footballTeam) {
        return res.status(404).json({error: 'Team does not exist'})
    }

    res.status(200).json(footballTeam);
}

// UPDATE a team
const updateFootballTeam = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Team does not exist'})
    }

    const footballTeam = await footballTeamModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!footballTeam) {
        return res.status(404).json({error: 'Team does not exist'})
    }

    res.status(200).json(footballTeam);
}


module.exports = {
    createFootballTeam,
    getFootballTeams,
    getFootballTeam,
    deleteFootballTeam,
    updateFootballTeam
}