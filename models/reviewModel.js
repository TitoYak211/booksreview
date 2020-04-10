const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;