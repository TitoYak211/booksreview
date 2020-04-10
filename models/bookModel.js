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
