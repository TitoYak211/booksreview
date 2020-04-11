const Book = require('./../models/bookModel');
const catchAsync = require('./../utilities/catchAsync');
const handlerFactory = require('./handlerFactory');

exports.popularBooks = catchAsync(async (req, res, next) => {
    req.query.limit = 10;
    req.query.fields = 'author,title,year';
    next();
});

exports.getBooksStats = catchAsync(async (req, res, next) => {
    const stats = await Book.aggregate([
        {
            $match: { year: { $gte: 2015 } }
        },
        {
            $group: {
                _id: '$year',
                numBooks: { sum: 1 }
            }
        },
        {
            $sort: { numBooks: 1 }
        }
    ]);
    res.status(200).json({
        status: 'Success',
        data: {
            stats
        }
    });
});

// Get all books
exports.getAllBooks = handlerFactory.getAllDocs(Book);

// Get a book
exports.getBook = handlerFactory.getDoc(Book, { path: 'reviews' });

// Update a book
exports.updateBook = handlerFactory.updateDoc(Book);

// Delete a book
exports.deleteBook = handlerFactory.deleteDoc(Book);