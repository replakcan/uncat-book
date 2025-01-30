const mongoose = require('mongoose')
const Question = require('./question')
const nanoId = require('nanoid')

const Event = new mongoose.Schema({
    title: String,
    questions: [Question],
    code: {
        type: String,
        unique: true
    },
    participants: [{
        type: 'ObjectId',
        ref: 'User'
    }]
})

Event.pre("save", async function(next) {
    if (this.code) return next()

    let code

    do {
        code = nanoId.nanoid()
    } while (await mongoose.models["Event"].findOne({ code }))
    
    this.code = code
})


module.exports = mongoose.model('Event', Event)