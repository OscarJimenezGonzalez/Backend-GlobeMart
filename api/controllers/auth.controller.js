const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {

    try {

        if (req.body.password.length < 8) {
            return res.status(400).json({ message: 'Password too short' })
        }

        const salt = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS))
        const encrypted = bcrypt.hashSync(req.body.password, salt)
        
        req.body.password = encrypted
        const user = await User.create(req.body)

        const token = jwt.sign({ email: user.email, username: user.username }, process.env.SECRET, { expiresIn: '1h' })
        return res.status(200).json({
            message: 'User created',
            token: token
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {

    try {
        let user = ""
        if (Object.hasOwn(req.body, "email")) {
            user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

        } else {
            user = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
        }

        if (!user) {
            return res.status(401).json({ message: 'Error: Wrong Email, Username or Password' })
        }

        const comparePassword = bcrypt.compareSync(req.body.password, user.password)
        if (comparePassword) {

            const payload = { email: user.email, username: user.username }
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
            const role = user.role
            return res.status(200).json({ token, role })

        }
        else {
            return res
                .status(401)
                .json({ message: "Error: Wrong Email, Username or Password" });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signUp, login
}
