const UserController = require('../controllers/user.controller')
const express = require('express')
const routes = express.Router()

routes.post('/login', UserController.login)
routes.post('/register', UserController.register)
routes.post('/logout', UserController.logout)
module.exports = routes