const express = require('express')
const router = express.Router()
const Person = require('../models/person.js')

router.get('/', async (req, res) => {
    try {
        const safePeople = await Person.find({
            foundLost: 'Found'
        })
        res.status(200).send(safePeople)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router