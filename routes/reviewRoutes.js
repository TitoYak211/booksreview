const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authentication = require('./../controllers/authentication');
const paramMiddlewares = require('./../controllers/paramMiddlewares');

const router = express.Router({ mergeParams: true });

router.use(authentication.protectRoutes);

router.route('/')
    .get(authentication.restrictRole('admin'), reviewController.getAllReviews)
    .post(reviewController.setBookUserIds, reviewController.createReview);

router.use(paramMiddlewares.checkID);

router.route('/:id')
    .get(reviewController.getReview)
    .patch(reviewController.updateReview)
    .delete(reviewController.deleteReview);

module.exports = router;