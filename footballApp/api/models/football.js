const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const footballSchema = new Schema({
    team: {
        type: String,
        required: true
    },
    gamesPlayed: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    draw: {
        type: Number,
        required: true
    },
    loss: {
        type: Number,
        required: true
    },
    goalsFor: {
        type: Number,
        required: true
    },
    goalsAgainst: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

const football = mongoose.model("football", footballSchema);

module.exports = football;