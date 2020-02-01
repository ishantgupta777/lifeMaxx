const express = require('express')
const router = express.Router()
const SafeSpot = require('../models/safeSpots')

router.get('/safeSpots/:disaster_type', async (req, res) => {

    try {
        const disaster_type = req.params.disaster_type
        const safeSpots = await SafeSpot.find({
            disaster_type
        })
        res.status(200).send(safeSpots)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.post('/addSafeSpot', async (req, res) => {
    try {
        const safeSpot = new SafeSpot(req.body)
        await safeSpot.save()
        console.log(safeSpot)
        res.status(200).send(safeSpot)
    } catch (err) {
        console.log(err)
        res.send(500).send(err)
    }
})

module.exports = router