const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authentication = require('./../controllers/authentication');

const router = express.Router();

// Routes
router.route('/')
    .get(reviewController.getAllReviews)
    .post(authentication.protectRoutes, reviewController.createReview);

module.exports = router;