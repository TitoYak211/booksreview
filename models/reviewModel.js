const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, 'Review cannot be empty']
        },
        rating: {
            type: String,
            min: 1,
            max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        book: {
            type: mongoose.Schema.ObjectId,
            ref: 'Book',
            required: [true, 'A review must belong to a book.']
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A review must belong to a user.']
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;