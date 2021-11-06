//imports
    require("dotenv").config()

    const express = require("express")
    const app = express()

    const bodyParser = require("body-parser")
    const mongoose = require("mongoose")

    const cors = require('cors')

    const authController = require("./controllers/authController")
    const projectController = require("./controllers/projectController")

// configs
    app.use(express.json())

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    mongoose.connect("mongodb://localhost/loginapitwo", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB connect with success!")
    })
    .catch((err) => {
        console.log(err)
    })

    app.use(cors())
  
// routes
    app.use("/auth", authController)
    app.use("/project", projectController)

app.listen(process.env.PORT || 4343, () => console.log("Server running"))