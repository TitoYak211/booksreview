const express = require('express');

const bookController = require('./../controllers/bookController');

// Routes
const router = express.Router();

router.route('/').get(bookController.getAllBooks).post(bookController.addBook);
router.route('/:id').get(bookController.getBook).patch(bookController.updateBook).delete(bookController.deleteBook);

module.exports = router;