const express = require('express')
const app = express();
const morgan = require('morgan');

const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes')

// Use middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    req.requesTime = new Date().toISOString();
    next();
});


app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);

module.exports = app;