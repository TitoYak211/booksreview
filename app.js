const express = require('express')
const app = express();
const morgan = require('morgan');

const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes')

// Use middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`{__dirname}/public`));

app.use((req, res, next) => {
    req.requesTime = new Date().toISOString();
    next();
});

// Mounting routes for a nicer separation of resources
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    res.status(404).JSON({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });

    next();
});

// Global ErrorHandling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).JSON({
        status: err.status,
        message: err.message
    });

    next();
});

module.exports = app;