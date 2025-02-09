const mongoose = require('mongoose')

const Question = new mongoose.Schema({
    text: String,
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
    voted: {
        type: Boolean,
        default: false
    },
    is_highlighted: Boolean
}, { timestamps: true,
     toObject: {
        virtuals: true,
        transform(doc, ret, options) {
            delete ret.voters
            return ret
        }
    } 
})

Question.virtual('votes').get(function () {
    return this.voters.length
})

module.exports = Question