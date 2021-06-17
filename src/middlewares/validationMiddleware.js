const validation = (schema) => async (req, res, next) => {

    const body = req.body
    
    try {
        await schema.validate(body)
        next()
        
    } catch(errInvalid) {
        return res.status(400).json({ errInvalid })
    }

}

module.exports = validation