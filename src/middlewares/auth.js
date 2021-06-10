const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth.json")

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization

    if(!authHeader)
    return res.status(401).json({ error: "Not exists Header authorization" })

    const parts = authHeader.split(' ')

    if(!parts === 2)
    return res.status(401).json({ error: "Header not have 2 parts" })

    const [ scheme, token ] = parts

    if(!/^Bearer$/i.test(scheme))
    return res.status(401).json({ error: "You need write wor Bearer" })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
        return res.status(401).json({ error: "Invalid token" })

        req.userId = decoded.id
        return next()
    })


}