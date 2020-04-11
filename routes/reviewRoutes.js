const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authentication = require('./../controllers/authentication');
const paramMiddlewares = require('./../controllers/paramMiddlewares');

const router = express.Router({ mergeParams: true });

// Routes
router.route('/')
    .get(reviewController.getAllReviews)
    .post(authentication.protectRoutes, reviewController.createReview);

router.route('/:id')
    .delete(authentication.protectRoutes, paramMiddlewares.checkID, reviewController.deleteReview);

module.exports = router;