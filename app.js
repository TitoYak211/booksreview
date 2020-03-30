const express = require('express')
const app = express();
const morgan = require('morgan');

// Use middlewares
app.use(morgan('dev'));

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

const getAllUsers = (req, res) => {
    res.status(200).json({ message: 'These are all users', app: "booksreview" });
};

const getUser = (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Get a user by id', app: "booksreview"});
};

const addUser = (req, res) => {
    res.status(201).json({ message: 'New user added', app: "booksreview"});
};

const updateUser = (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Update a user given an id', app: "booksreview"});
};

const deleteUser = (req, res) => {
    const id = req.params.id * 1;
    res.status(204).json({ message: 'Delete a user given an id', app: "booksreview"});
};

app.route('/api/books').get(getAllBooks).post(addBook);
app.route('/api/books/:id').get(getBook).patch(updateBook).delete(deleteBook);

app.route('/api/users').get(getAllUsers).post(addUser);
app.route('/api/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = app;