const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authentication = require('./../controllers/authentication');
const paramMiddlewares = require('./../controllers/paramMiddlewares');

const router = express.Router({ mergeParams: true });

// Routes
router.route('/')
    .get(reviewController.getAllReviews)
    .post(authentication.protectRoutes, reviewController.setBookUserIds, reviewController.createReview);

router.route('/:id')
    .get(authentication.protectRoutes, paramMiddlewares.checkID, reviewController.getReview)
    .patch(authentication.protectRoutes, paramMiddlewares.checkID, reviewController.updateReview)
    .delete(authentication.protectRoutes, paramMiddlewares.checkID, reviewController.deleteReview);

module.exports = router;