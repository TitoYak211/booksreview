const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authentication = require('./../controllers/authentication');

// Create router
const router = express.Router();

// Render overviewpage
router.get('/', authentication.isLoggedIn, viewsController.getOverview);

// Render a book page
router.get('/book/:isbn', authentication.protectRoutes, viewsController.getBook);

// Render login form
router.get('/login', authentication.isLoggedIn, viewsController.getLoginForm);

// Render login form
router.get('/signup', authentication.isLoggedIn, viewsController.getSignupForm);

module.exports = router;
