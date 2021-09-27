const UserController = require('../controllers/user.controller')
const express = require('express')
const routes = express.Router()

routes.post('/login', UserController.login)
routes.post('/register', UserController.register)
routes.get('/', UserController.getUserRequest)
routes.post('/logout', UserController.logout)
// token = UserController.token
module.exports = routes