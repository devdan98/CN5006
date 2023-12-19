const express = require('express');
const {
    createFootballTeam,
    getFootballTeams,
    getFootballTeam,
    deleteFootballTeam,
    updateFootballTeam,
    getAverageGoalsForYear
} = require('../controllers/footballController')

const router = express.Router();

// GET all the football teams and scores
router.get('/', getFootballTeams);

// GET average goals for a given year
router.get('/average-goals/:year', getAverageGoalsForYear);

// GET a single team with their scores
router.get('/:id', getFootballTeam);

// POST a new team
router.post('/', createFootballTeam);

// DELETE a team
router.delete('/:id', deleteFootballTeam);

// UPDATE a team
router.patch('/:id', updateFootballTeam);

module.exports = router;