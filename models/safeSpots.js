const mongoose = require('mongoose')

const safeSpotsSchema = mongoose.Schema({
    lat: {
        type: Number,
        required: 'latitude is required'
    },
    long: {
        type: Number,
        required: 'longitude is required'
    },
    disaster_type: {
        type: String,
        enum: ['Flood', 'Earthquake', 'Cyclone']
    }
})

const SafeSpot = mongoose.model('SafeSpot', safeSpotsSchema)

module.exports = SafeSpot