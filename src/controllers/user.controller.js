const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const salt = 10
require('dotenv').config()
const JWT_TOKEN = process.env.JWT_TOKEN
var token;

const register = async (req, res) => {
    let {full_name, email, password: plainTextPassword} = req.body;
    let password = await bcrypt.hash(plainTextPassword, salt)    

    try {
        const user = new User({
            full_name: full_name,
            email: email,
            password: password
        })
        await user.save();
        res.send({message:"Create user success", user:user})
    } catch (error) {
        if(error.code === 11000){
            return res.send({status:'error', error:'email already exist'})
        }
        throw error
    }
}

const verifyUserLogin = async (email, password) => {
    try {
        const user = await User.findOne({email}).lean()
        if(!user){
            return {status:'error', error:'email is not found'}
        }
        console.log(user.password)

        let verify = await bcrypt.compare(password, user.password)
        console.log(verify)
        if(verify){
            token = jwt.sign({id:user._id, full_name:user.full_name, email:user.email, type:'user'}, JWT_TOKEN, {expiresIn: '2h'})
            return {status:'ok', data:token}
        }else{
            return {status:'error', error:'password is invalid'}
        }

    } catch (error) {
        console.log(error)
        return {status:'error', error:'time out'}
    }
}

const login = async (req, res) => {
    try {        
        let {email, password} = req.body
        let response = await verifyUserLogin(email, password)
        if(response.status === 'ok'){
            res.cookie('token', token, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true})
            res.status(201).send({response:response})
        }else{
            res.send({response:response})
        }
    } catch (error) {
        console.log(error)
    }
}

const logout = (req, res) => {
    res.cookie('token', token, {maxAge:1})
    res.send({message:'Logout Success'})
}

module.exports = {register, login, logout}