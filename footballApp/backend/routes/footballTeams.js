const express = require('express');
const {
    createFootballTeam,
    getFootballTeams,
    getFootballTeam
} = require('../controllers/footballController')

const router = express.Router();

// GET all the football teams and scores
router.get('/', getFootballTeams);

// GET a single team with their scores
router.get('/:id', getFootballTeam);

// POST a new team
router.post('/', createFootballTeam);

// DELETE a team
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a team'})
})

// UPDATE a team
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a team'})
})

module.exports = router;