const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const authConfig = require("../config/auth.json")

require("../models/User")
const User = mongoose.model("users")

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

router.get("/listuser", async(req, res) => {

    try {

        const listUser = await User.find()

        res.json(listUser)

    } catch(err) {
        res.status(400).json({ error: "Error list users"})
    }

})


router.post("/register", async(req, res) => {
    
    try {
        const { name, email } = req.body

        const userExists = await User.findOne({ name, email })

        if(userExists)
        return res.status(400).json({ error: "This account already exists" })

        const nameExists = await User.findOne({ name })

        if(nameExists)
        return res.status(400).json({ error: "This name is already in use" })

        const emailExists = await User.findOne({ email })

        if(emailExists)
        return res.status(400).json({ error: "This email is already in use" })

        const user = await User.create(req.body)

        user.password = undefined

        res.json({ 
            user,
            token: generateToken({ id: user.id })
         })

    } catch (err) {
        res.status(400).json({ error: "Error create account" })
    }

})

router.post("/authenticate", async(req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email }).select("+password")

    if(!user)
    return res.status(400).json({ error: "Invalid email" })

    const comparePassword = await bcrypt.compare(password, user.password)

    if(!comparePassword)
    return res.status(400).json({ error: "Invalid password" })

    user.password = undefined

    res.json({ 
        user,
        token: generateToken({ id: user.id })
    })

}) 


module.exports = router