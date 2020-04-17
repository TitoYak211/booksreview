const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authentication = require('./../controllers/authentication');

// Create router
const router = express.Router();

router.use(authentication.isLoggedIn);

// Render overviewpage
router.get('/', viewsController.getOverview);

// Render a book page
router.get('/book/:isbn', authentication.protectRoutes, viewsController.getBook);

// Render login form
router.get('/login', viewsController.getLoginForm);

// Render login form
router.get('/signup', viewsController.getSignupForm);

module.exports = router;
