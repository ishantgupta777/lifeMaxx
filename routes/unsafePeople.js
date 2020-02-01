const express = require('express')
const router = express.Router()
const Person = require('../models/person.js')

router.get('/', async (req, res) => {
    try {
        const safePeople = await Person.find({
            foundLost: 'NotFound'
        })
        res.status(200).send(safePeople)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/geoJson', async (req, res) => {
    try {
        const safePeople = await Person.find({
            foundLost: 'NotFound'
        })
        const safePeopleJson = safePeople.map(person => {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": person.lastLocation.reverse()
                },
                "properties": {

                }
            }
        })
        res.status(200).send(safePeopleJson)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router