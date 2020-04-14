const Book = require('./../models/bookModel');
const catchasync = require('./../utilities/catchAsync');

exports.getOverview = catchasync(async (req, res) => {
    // Get books from DB
    const books = await Book.find();

    res.status(200).render('overview', {
        title: 'All Books',
        books
    });
});

exports.getBook = (req, res) => {
    res.status(200).render('book', {
        title: 'The Litle Brown Fox'
    });
};