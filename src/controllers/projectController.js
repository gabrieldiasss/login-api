const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/auth")

router.use(authMiddleware)

router.get("/", (req, res) => {
    res.json("Page Project hehe" )
})

module.exports = router