const express = require('express');

const bookController = require('./../controllers/bookController');
const paramMiddlewares = require('./../controllers/paramMiddlewares');

// Routes
const router = express.Router();

router.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.addBook);

router.route('/:id')
    .get(paramMiddlewares.checkID, bookController.getBook)
    .patch(paramMiddlewares.checkID, bookController.updateBook)
    .delete(paramMiddlewares.checkID, bookController.deleteBook);

module.exports = router;