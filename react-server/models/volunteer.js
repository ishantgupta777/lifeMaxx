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
    number: Number,
    nearestRescueCentre: {
        type: String
    }
}, {
    timestamps: true
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person