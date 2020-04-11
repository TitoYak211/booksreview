const Review = require('./../models/reviewModel');
const catchAsync = require('./../utilities/catchAsync');
const handlerFactory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
    let filterObj = {};

    if (req.params.bookId) {
        filterObj = { tour: req.params.bookId };
    };

    const reviews = await Review.find(filterObj);

    res.status(200).JSON({
        status: 'Success',
        results: reviews.length,
        data: {
            reviews
        }
    });
});

exports.createReview = catchAsync(async (req, res, next) => {
    // Allow nested routes
    if (!req.body.book) {
        req.body.book = req.params.bookId;
    };

    if (!req.body.user) {
        req.body.user = req.user.id;
    };

    const newReview = await Review.create(req.body);

    res.status(201).JSON({
        status: 'Success',
        data: {
            review: newReview
        }
    });
});

// Update review
exports.updateReview = handlerFactory.updateDoc(Review);

// Delete review
exports.deleteReview = handlerFactory.deleteDoc(Review);