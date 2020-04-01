const express = require('express');

const bookController = require('./../controllers/bookController');
const paramMiddlewares = require('./../controllers/paramMiddlewares');

// Routes
const router = express.Router();

// router.param('id', paramMiddlewares.checkID);

router.route('/popular-books').get(bookController.popularBooks, bookController.getAllBooks);

router.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.addBook);

router.route('/:id')
    .get(paramMiddlewares.checkID, bookController.getBook)
    .patch(paramMiddlewares.checkID, bookController.updateBook)
    .delete(paramMiddlewares.checkID, bookController.deleteBook);

module.exports = router;