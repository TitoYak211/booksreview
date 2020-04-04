const express = require('express');

const userController = require('./../controllers/userController');
const paramMiddlewares = require('./../controllers/paramMiddlewares');
const authentication = require('./../controllers/authentication');

// Routes
const router = express.Router();

router.post('signup', authentication.signup);

router.route('/')
    .get(userController.getAllUsers)
    .post(paramMiddlewares.checkBody, userController.addUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;