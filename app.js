const express = require('express')
const app = express();

// Use middlewares
app.use(express.json());

app.get('/api/books', (req, res) => {
    res.status(200).json({ message: 'Hello from the server side', app: "booksreview"});
});

module.exports = app;