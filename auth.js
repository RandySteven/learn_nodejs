const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_TOKEN = process.env.JWT_TOKEN
const cookieParser = require('cookie-parser')

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const verifyToken = (req, res, next) => {
    let token = req.cookies
    console.log(token.token)

    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
    let verify;
    try {
        verify = jwt.verify(token.token, JWT_TOKEN)
    } catch (error) {
        console.log(error.message)
        return res.status(401).send({message:'Invalid token'})   
    }
    return next()
}

module.exports = verifyToken