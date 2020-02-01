const express = require('express')
const router = express.Router()
const LiveUpdate = require('../models/liveUpdate')

router.get('/', async (req, res) => {

    try {
        const liveUpdates = await LiveUpdate.find({})
        res.status(200).send(liveUpdates)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const liveUpdate = new LiveUpdate(req.body)
        await liveUpdate.save()
        console.log(liveUpdate)
        res.status(200).send(liveUpdate)
    } catch (err) {
        console.log(err)
        res.send(500).send(err)
    }
})

module.exports = router