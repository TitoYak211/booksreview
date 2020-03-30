const express = require('express');

const userController = require('./../controllers/userController');
const paramMiddlewares = require('./../controllers/paramMiddlewares');

// Routes
const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(paramMiddlewares.checkBody, userController.addUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;