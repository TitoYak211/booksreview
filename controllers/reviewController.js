const Review = require('./../models/reviewModel');
const handlerFactory = require('./handlerFactory');

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

// Get all reviews
exports.getAllReviews = handlerFactory.getAllDocs(Review);

// Get a review
exports.getReview = handlerFactory.getDoc(Review);

// Create a review
exports.createReview = handlerFactory.createDoc(Review);

// Update review
exports.updateReview = handlerFactory.updateDoc(Review);

// Delete review
exports.deleteReview = handlerFactory.deleteDoc(Review);