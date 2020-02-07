const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req, res, next) => {
    var token = req.headers.authorization
    if (!token)
        return res.send(401).send('User Not Authorized')
    if (!token.split(' ')[0] === 'Bearer')
        return res.status(401).send('Token is not in proper format')
    else
        token = token.split(' ')[1]
    try {
        jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
            if (err)
                return res.status(401).send('Unauthorized Token')
            req.decodedTokenData = decoded
            req.body.email = decoded.email
            req.body.username = decoded.username
            req.token = token

            const user = await User.findOne({
                email: decoded.email
            })
            var validTokens = user.tokens
            validTokens = validTokens.map(token => token.token)
            if (!validTokens.includes(token))
                return res.status(401).send('Please Sign In')
            next()
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('server error in authentication')
    }
}

module.exports = auth