const express = require('express');

const getAllBooks = (req, res) => {
    res.status(200).json({ message: 'These are all books', app: "booksreview" });
};

const getBook = (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Get a book by id', app: "booksreview"});
};

const addBook = (req, res) => {
    res.status(201).json({ message: 'New book added', app: "booksreview"});
};

const updateBook = (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Update a book given id', app: "booksreview"});
};

const deleteBook = (req, res) => {
    const id = req.params.id * 1;
    res.status(204).json({ message: 'Delete a book given id', app: "booksreview"});
};

const router = express.Router();

router.route('/').get(getAllBooks).post(addBook);
router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;