const path = require('path');
const express = require('express')
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utilities/AppError');
const globalErrorHandler = require('./controllers/errorController')
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// Use pug templating engine
app.set('view engine', 'pug');

// Views path to templates
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

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

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against malicious html code
app.use(xss());

// Prevent parameter polution
app.use(hpp({
    whitelist: ['year']
}));

app.use((req, res, next) => {
    req.requesTime = new Date().toISOString();
    next();
});

// Web overview root page
app.get('/', (req, res) => {
    res.status(200).render('base');
});

// Render overviewpage
app.get('/overview', (req, res) => {
    res.status(200).render('overview', {
        title: 'All Books'
    });
});

// Render a book page
app.get('/book', (req, res) => {
    res.status(200).render('book', {
        title: 'The Litle Brown Fox'
    });
});

// Mounting routes for a nicer separation of resources
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global ErrorHandling middleware
app.use(globalErrorHandler);

module.exports = app;