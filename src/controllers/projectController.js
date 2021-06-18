const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/auth")

router.use(authMiddleware)

router.get("/", (req, res) => {
    res.json("Você está autenticado!!!!" )
})

module.exports = router