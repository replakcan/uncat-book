const mongoose = require('mongoose')

const Question = new mongoose.Schema({
    text: String,
    votes: {
        type: Number,
        default: 0
    },
    voters: {
        type: [String],
        default: []
    },
    user: {
        /* type: 'ObjectId',
        ref: 'User' */
        type: String,
        default: "Anonymous"
    },
    is_highlighted: Boolean
}, { timestamps: true })

module.exports = Question