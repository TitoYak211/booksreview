const express = require('express');
const viewsController = require('../controllers/viewsController')

// Create router
const router = express();

// Render overviewpage
router.get('/', viewsController.getOverview);

// Render a book page
router.get('/book:slug', viewsController.getBook);

module.exports = router;
