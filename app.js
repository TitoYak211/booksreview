const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from the server side', app: "booksreview"});
});

module.exports = app;