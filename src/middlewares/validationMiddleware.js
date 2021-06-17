const validation = (schema) => async (req, res, next) => {

    const body = req.body
    
    try {
        await schema.validate(body)
        next()
        
    } catch(errInvalid) {
        return res.status(401).json({ errInvalid })
    }

}

module.exports = validation