const mongoose = require('mongoose')

const liveUpdateSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const LiveUpdate = mongoose.model('liveUpdate', liveUpdateSchema)

module.exports = LiveUpdate