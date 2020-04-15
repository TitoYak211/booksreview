const Book = require('./../models/bookModel');
const catchasync = require('./../utilities/catchAsync');

exports.getOverview = catchasync(async (req, res) => {
    // Get books from DB
    const books = await Book.find();

    res.status(200).render('overview', {
        title: 'All Books',
        books: books.slice(0, 12)
    });
});

exports.getBook = catchasync(async (req, res) => {
    // Get book details
    const book = await Book.findOne({ slug: req.params.slug }).populate({
        path: 'views',
        fileds: 'review rating user'
    });

    res.status(200).render('book', {
        title: book.title,
        book
    });
});