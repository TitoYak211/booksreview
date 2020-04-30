const Book = require('./../models/bookModel');
const catchasync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');
const request = require('request-promise');
const parseString = require('xml2js').parseString;

exports.getOverview = catchasync(async (req, res) => {
    // Get books from DB
    const books = await Book.find();

    res.status(200).render('overview', {
        title: 'All Books',
        books
    });
});

exports.getBook = catchasync(async (req, res, next) => {
    // Get book details
    const book = await Book.findOne({ _id: req.params.id }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    if (!book) {
        return next(new AppError('There is no book with that id.', 404));
    }

    res.status(200).render('book', {
        title: book.title,
        book
    });
});

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log in'
    })
};

exports.getSignupForm = (req, res) => {
    res.status(200).render('signup', {
        title: 'Sign up'
    })
};

exports.getProfile = (req, res) => {
    res.status(200).render('profile', {
        title: 'My profile'
    });
};