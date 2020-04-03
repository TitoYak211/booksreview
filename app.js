const express = require('express')
const app = express();
const morgan = require('morgan');

const AppError = require('./utilities/AppError');
const globalErrorHandler = require('./controllers/errorController')
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
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global ErrorHandling middleware
app.use(globalErrorHandler);

module.exports = app;