const express = require('express');

const userController = require('./../controllers/userController');
const authentication = require('./../controllers/authentication');

// Routes
const router = express.Router();

router.route('/signup')
    .post(authentication.signup);

router.route('/login')
    .post(authentication.login);

router.route('/forgotPassword')
    .post(authentication.forgotPassword);

router.route('/resetPassword/:token')
    .patch(authentication.resetPassword);

// Protect all routes below
router.use(authentication.protectRoutes);

router.route('/updatePassword')
    .patch(authentication.updatePassword);

router.get('/me', userController.getMe, userController.getUser);

router.route('/updateMe')
    .patch(userController.updateMe);

router.route('/deleteMe')
    .delete(userController.deleteMe);


router.route('/')
    .get(userController.getAllUsers);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;