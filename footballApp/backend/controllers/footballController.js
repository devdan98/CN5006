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
    const newFootballTeam = new footballTeamModel({
        team, gamesPlayed, wins, draw, loss, goalsFor, goalsAgainst, points, year
    });

    try {
        await newFootballTeam.save();
        res.status(200).json(newFootballTeam);
    } catch (error) {
        res.status(400).json({error: error.message});
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

// UPDATE a team using PATCH
const updateFootballTeam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Team does not exist' });
  }

  // Extract only the fields you want to update
  const {
      team, gamesPlayed, wins, draw, loss, goalsFor, goalsAgainst, points, year
  } = req.body;

  // Check if any fields are provided for update
  if (!team && !gamesPlayed && !wins && !draw && !loss && !goalsFor && !goalsAgainst && !points && !year) {
      return res.status(400).json({ error: 'No fields provided for update' });
  }

  const updatedFields = {
      team, gamesPlayed, wins, draw, loss, goalsFor, goalsAgainst, points, year
  };

  // Remove undefined values to avoid updating with undefined
  Object.keys(updatedFields).forEach((key) => updatedFields[key] === undefined && delete updatedFields[key]);

  const footballTeam = await footballTeamModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields }, // Use $set to update only specified fields
      { new: true }
  );

  if (!footballTeam) {
      return res.status(404).json({ error: 'Team does not exist' });
  }

  res.status(200).json(footballTeam);
};



module.exports = {
    createFootballTeam,
    getFootballTeams,
    getFootballTeam,
    deleteFootballTeam,
    updateFootballTeam
}