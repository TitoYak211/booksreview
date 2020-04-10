const Review = require('./../models/reviewModel');
const catchAsync = require('./../utilities/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find();

    res.status(200).JSON({
        status: 'Success',
        results: reviews.length,
        data: {
            reviews
        }
    });
});

exports.getReview = catchAsync(async (req, res, next) => {
    const newReview = await Review.create(req.body);

    res.status(201).JSON({
        status: 'Success',
        data: {
            review: newReview
        }
    });
});