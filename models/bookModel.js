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

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
