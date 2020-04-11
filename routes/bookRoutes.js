const express = require('express');

const bookController = require('./../controllers/bookController');
const paramMiddlewares = require('./../controllers/paramMiddlewares');
const authentication = require('./../controllers/authentication');
const reviewRouter = require('./../routes/reviewRoutes');

// Routes
const router = express.Router();

router.use('/:bookId/reviews', reviewRouter)

router.route('/')
    .get(bookController.getAllBooks);

router.use(authentication.protectRoutes);

router.route('/popular-books')
    .get(authentication.protectRoutes, bookController.popularBooks, bookController.getAllBooks);

router.route('/books-stats')
    .get(bookController.getBooksStats);


router.use(paramMiddlewares.checkID);

router.route('/:id')
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(authentication.restrictRole('admin'), bookController.deleteBook);

module.exports = router;