const express = require('express');

const userController = require('./../controllers/userController');
const paramMiddlewares = require('./../controllers/paramMiddlewares');
const authentication = require('./../controllers/authentication');

// Routes
const router = express.Router();

router.route('/signup')
    .post(paramMiddlewares.checkBody, authentication.signup);

router.route('/login')
    .post(paramMiddlewares.checkBody, authentication.login);

router.route('/forgotPassword')
    .post(paramMiddlewares.checkBody, authentication.forgotPassword);

router.route('/resetPassword/:token')
    .patch(paramMiddlewares.checkBody, authentication.resetPassword);

router.route('/updatePassword')
    .patch(paramMiddlewares.checkBody, authentication.protectRoutes, authentication.updatePassword);

router.route('/updateCurrentUser')
    .patch(paramMiddlewares.checkBody, authentication.protectRoutes, userController.updateMe);

router.route('/deleteCurrentUser')
    .delete(paramMiddlewares.checkBody, authentication.protectRoutes, userController.deleteMe);


router.route('/')
    .get(userController.getAllUsers);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;