const express = require('express')
const app = express();

// Use middlewares
app.use(express.json());

app.get('/api/books', (req, res) => {
    res.status(200).json({ message: 'These are all books', app: "booksreview"});
});

app.get('/api/books/:id', (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Get a book by id', app: "booksreview"});
});

app.post('/api/books', (req, res) => {
    res.status(200).json({ message: 'New book added', app: "booksreview"});
});

app.patch('/api/books/:id', (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Update a book given id', app: "booksreview"});
});

module.exports = app;