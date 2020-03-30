const express = require('express')
const app = express();

// Use middlewares
app.use(express.json());

app.use((req, res, next) => {
    req.requesTime = new Date().toISOString();
    next();
});

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

app.route('/api/books').get(getAllBooks).post(addBook);
app.route('/api/books/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = app;