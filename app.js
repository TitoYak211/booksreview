const express = require('express')
const app = express();

// Use middlewares
app.use(express.json());

app.get('/api/books', (req, res) => {
    res.status(200).json({ message: 'These are all books', app: "booksreview"});
});

app.post('/api/books', (req, res) => {
    res.status(200).json({ message: 'New book added', app: "booksreview"});
});

module.exports = app;