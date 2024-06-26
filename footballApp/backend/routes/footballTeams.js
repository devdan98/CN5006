const express = require('express');
const {
    createFootballTeam,
    getFootballTeams,
    getFootballTeam,
    deleteFootballTeam,
    updateFootballTeam,
    getAverageGoalsForYear,
    getTotalStatsForYear
} = require('../controllers/footballController')

const router = express.Router();

// GET all the football teams and scores
router.get('/', getFootballTeams);

// GET average goals for a given year
router.get('/average-goals/:year', getAverageGoalsForYear);

// GET total games played, draws, and wins for a given year
router.get('/total-stats/:year', getTotalStatsForYear);

// GET a single team with their scores
router.get('/:id', getFootballTeam);

// POST a new team
router.post('/', createFootballTeam);

// DELETE a team
router.delete('/:id', deleteFootballTeam);

// UPDATE a team
router.patch('/:id', updateFootballTeam);

module.exports = router;