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

exports.setBookUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.book) {
        req.body.book = req.params.bookId;
    };

    if (!req.body.user) {
        req.body.user = req.user.id;
    };

    next();
};

// Get a review
exports.getReview = handlerFactory.getDoc(Review);

// Create a review
exports.createReview = handlerFactory.createDoc(Review);

// Update review
exports.updateReview = handlerFactory.updateDoc(Review);

// Delete review
exports.deleteReview = handlerFactory.deleteDoc(Review);