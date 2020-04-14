const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: [true, "A book must have isbn"],
    unique: true
  },
  title: {
    type: String,
    required: [true, "A book must have a title"],
    unique: false
  },
  author: {
    type: String,
    required: [true, "A book must have an author"]
  },
  year: {
    type: Number,
    required: [true, "A book must have a publication year"]
  },
  ratingsAverage: {
    type: Number,
    default: 5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be less than or equal to 5.0'],
    set: ratingValue => Math.round(ratingValue * 10) / 10
  },
  numRatings: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  }
});

// Virtual populate reviews
bookSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'book',
  localField: '_id'
});

// Create a book
const Book = mongoose.model("Book", bookSchema);

// Export book schema
module.exports = Book;
