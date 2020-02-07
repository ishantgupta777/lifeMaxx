const User = require('../models/users')

const UserDetails = async (req, res, next) => {
    try {
        const username = req.body.username
        const email = req.body.email
        var user = await User.findOne({
            username
        })
        if (!user) {
            user = User.findOne({
                email
            })
        }
        if (!user)
            res.status(401).send('User Not Found')
        req.user = user
        next();
    } catch (err) {
        res.status(500).send('Err in user details middleware')
    }
}

module.exports = UserDetails