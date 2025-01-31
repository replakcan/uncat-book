const mongoose = require('mongoose')

const Question = new mongoose.Schema({
    text: String,
    votes: Number,
    user: {
        /* type: 'ObjectId',
        ref: 'User' */
        type: String
    },
    is_highlighted: Boolean
})

module.exports = Question