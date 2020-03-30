const express = require('express')
const app = express();

// Use middlewares
app.use(express.json());

app.get('/api/books', (req, res) => {
    res.status(200).json({ message: 'These are all books', app: "booksreview"});
});

app.get('/api/books/:id', (req, res) => {
    console.log(req.params);
    res.status(200).json({ message: 'Get a book by id', app: "booksreview"});
});

app.post('/api/books', (req, res) => {
    res.status(200).json({ message: 'New book added', app: "booksreview"});
});

module.exports = app;