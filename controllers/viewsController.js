const Book = require('./../models/bookModel');
const catchasync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');
const got = require('got');
const {promisify} = require('util');
const parseString = require('xml2js').parseString;
const ps = promisify(parseString);
const http = require('http');
const https = require('https');

http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;

// Return books array from goodreads as a promise  
const goodreads = async () => {
    // Get books from DB
    const books = await Book.find();

    // Get all books details as array
    const booksArray = await Promise.all(books.map(async (book) => {
        // Make request for each book
        const response = await got(`https://www.goodreads.com/book/isbn/${book.isbn}?key=${process.env.GOODREADS_KEY}`);

        // Convert xml response to js
        const bookData = await ps(response.body);

        // Return book data
        return bookData.GoodreadsResponse.book[0];
    }));

    return booksArray;
}

exports.getOverview = catchasync(async (req, res) => {
    // Get books from DB
    const books = await Book.find();

    res.status(200).render('overview', {
        title: 'All Books',
        books
    });
});

exports.getBook = catchasync(async (req, res, next) => {
    // Check for isbn
    if (!req.params.isbn) {
        return next(new AppError('There is no isbn in request params.', 404));
    }

    // Get book details
    const response = await got(`https://www.goodreads.com/book/isbn/${req.params.isbn}?key=${process.env.GOODREADS_KEY}`);
    const bookData = await ps(response.body);
    const goodreadsBook = bookData.GoodreadsResponse.book[0];

    res.status(200).render('book', {
        title: goodreadsBook.title,
        book: goodreadsBook
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