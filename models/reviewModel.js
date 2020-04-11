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

// Populate user and book objects
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });

    next();
});

reviewSchema.statics.calculateAverageRatings = async function(bookId) {
    const stats = await this.aggregate([
        {
            $match: { book: bookId }
        },
        {
            $group: {
                _id: '$book',
                numRatings: { $sum: 1 },
                ratingsAverage: { $avg: '$ratingsAverage' }
            }
        }
    ]);
};

reviewSchema.post('save', function () {
    this.constructor.calculateAverageRatings(this.book)
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;