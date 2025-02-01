const mongoose = require('mongoose')

const Question = new mongoose.Schema({
    text: String,
    votes: {
        type: Number,
        default: 0
    },
    user: {
        /* type: 'ObjectId',
        ref: 'User' */
        type: String,
        default: "Anonymous"
    },
    is_highlighted: Boolean
})

module.exports = Question