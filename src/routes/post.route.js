const PostController = require('../controllers/post.controller')
const express = require('express');
const routes = express.Router();

routes.get('/', PostController.index);
routes.post('/create', PostController.create);
routes.get('/:id', PostController.show);
routes.put('/update/:id', PostController.update);
routes.delete('/delete/:id', PostController.destroy);

module.exports = routes