const express = require('express')
const router = express.Router()
const userDetails = require('../middleware/userDetails')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const User = require('../models/users')

router.post('/signup', async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body
        console.log(req.body)
        if (!username || !email || !password)
            return res.status(400).send('Incomplete Data To Signup')

        const user = new User(req.body)
        await user.getToken()
        await user.save()
        return res.status(200).send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})


router.post('/signin', userDetails, async (req, res) => {

    try {
        const password = req.body.password
        const user = req.user

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(500).send('Password is wrong')
        }
        await user.getToken()
        await user.save()
        res.status(200).send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.get('/logout', auth, userDetails, async (req, res) => {
    try {
        const user = req.user
        user.tokens = user.tokens.map(token => token.token).filter(token => token != req.token)
        await user.save()
        res.status(200).send('Succesfully Logout')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.get('/test', auth, (req, res) => {
    return res.status(200).send('ggg')
})

module.exports = router