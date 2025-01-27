const mongoose = require('mongoose')
const Question = require('./question')

const Event = new mongoose.Schema({
    title: String,
    questions: [Question],
    participants: [{
        type: 'ObjectId',
        ref: 'User'
    }]
})

module.exports = mongoose.model('Event', Event)