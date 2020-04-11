const mongoose = require('mongoose');
const Book = require('./bookModel');

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

reviewSchema.statics.calculateAverageRatings = async function (bookId) {
    // create statistics for rating-averages and number-of-ratings for a book
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

    // Update the fileds in the document(book)
    await Book.findByIdAndUpdate(bookId, {
        numRatings: stats[0].numRatings,
        ratingsAverage: stats[0].ratingsAverage
    });
};

reviewSchema.post('save', function () {
    this.constructor.calculateAverageRatings(this.book)
});

// Calculate ratings after deletion/update
reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.updatedReview = await this.findOne();

    next();
});

reviewSchema.post(/^findOneAnd/, async function() {
    this.updatedReview.constructor.calculateAverageRatings(this.updatedReview.book);

    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;