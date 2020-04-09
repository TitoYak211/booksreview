const express = require('express')
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const AppError = require('./utilities/AppError');
const globalErrorHandler = require('./controllers/errorController')
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes')

// Use middlewares
app.use(helmet());

if (process.env.NODE_ENV) {
    app.use(morgan('dev'));
}

// Limit the number of requests per IP address in a set time window
const limiter = rateLimit({
    max: 100,
    windowMS: 3600000,
    message: 'You have made too many requests from this IP address. Please try in 1 hour!!'
});

app.use('/api', limiter);

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