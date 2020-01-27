const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    },
    age: {
        type: Number
    },
    rescueCentre: {
        type: String
    },
    number: Number,
    relatives: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    lastLocation: {
        type: [Number]
    },
    foundLost: {
        type: String,
        enum: ['Found', 'NotFound'],
        default: 'NotFound'
    }
}, {
    timestamps: true
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person