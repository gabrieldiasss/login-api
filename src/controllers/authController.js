const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const authConfig = require("../config/auth.json")

const validation = require('../middlewares/validationMiddleware')
const loginSchema = require("../Validations/loginValidation")
const registerValidation = require("../Validations/registerValidation")

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

router.post("/register", validation(registerValidation), async(req, res) => {
    
    try {
        const { name, email } = req.body

        const userExists = await User.findOne({ name, email })

        if(userExists)
            return res.status(400).json({ error: "Essa conta já existe." })

        const nameExists = await User.findOne({ name })

        if(nameExists)
            return res.status(400).json({ error: "Esse nome já está em uso." })

        const emailExists = await User.findOne({ email })

        if(emailExists)
            return res.status(400).json({ error: "Esse email já está em uso." })

        const user = await User.create(req.body)

        user.password = undefined

        res.json({ 
            user,
            token: generateToken({ id: user.id })
         })

    } catch {
        res.status(400).json({ error: "Error create account" })
    }

})

router.post("/authenticate", validation(loginSchema), async(req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email }).select("+password")

    if(!user)
    return res.status(400).json({ error: "Email ou senha inválidas." })

    const comparePassword = await bcrypt.compare(password, user.password)

    if(!comparePassword)
    return res.status(400).json({ error: "Email ou senha inválidas." })

    user.password = undefined

    res.json({ 
        user,
        token: generateToken({ id: user.id })
    })

}) 

module.exports = router