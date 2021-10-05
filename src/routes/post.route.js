const PostController = require('../controllers/post.controller')
const express = require('express');
const routes = express.Router();
const auth = require('../../auth')

routes.get('/', auth, PostController.index);
routes.post('/create', auth, PostController.create);
routes.get('/:id', PostController.show);
routes.put('/update/:id', auth, PostController.update);
routes.delete('/delete/:id', auth, PostController.destroy);

module.exports = routes