const express = require('express');

const userController = require('./../controllers/userController');

// Routes
const router = express.Router();

router.param('id', (req, res, next, value) => {
    next();
});

router.route('/').get(userController.getAllUsers).post(userController.addUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;