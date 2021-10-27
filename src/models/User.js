const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const User = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }

})

User.pre('save', async function(next) {

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

mongoose.model("users", User)