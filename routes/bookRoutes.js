const express = require('express');

const bookController = require('./../controllers/bookController');
const paramMiddlewares = require('./../controllers/paramMiddlewares');
const authentication = require('./../controllers/authentication');
const reviewRouter = require('./../routes/reviewRoutes');

// Routes
const router = express.Router();

router.use('/:bookId/reviews', reviewRouter);

router.route('/popular-books')
    .get(authentication.protectRoutes, bookController.popularBooks, bookController.getAllBooks);

router.route('/books-stats')
    .get(bookController.getBooksStats);

router.route('/')
    .get(bookController.getAllBooks)
    .post(authentication.protectRoutes, bookController.addBook);

router.route('/:id')
    .get(paramMiddlewares.checkID, bookController.getBook)
    .patch(authentication.protectRoutes, paramMiddlewares.checkID, bookController.updateBook)
    .delete(authentication.protectRoutes, authentication.restrictRole('admin'), paramMiddlewares.checkID, bookController.deleteBook);

module.exports = router;