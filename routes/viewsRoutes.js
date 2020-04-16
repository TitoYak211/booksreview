const express = require('express');
const viewsController = require('../controllers/viewsController')

// Create router
const router = express();

// Render overviewpage
router.get('/', viewsController.getOverview);

// Render a book page
router.get('/book/:isbn', viewsController.getBook);

// Render login form
router.get('/login', viewsController.getLoginForm);

module.exports = router;
