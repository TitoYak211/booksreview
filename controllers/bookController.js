const Book = require('./../models/bookModel');
const BooksFeatures = require('./../utilities/features');
const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');

// ROUTES HANDLERS
exports.popularBooks = catchAsync(async (req, res, next) => {
    req.query.limit = 10;
    req.query.fields = 'author,title,year';
    next();
});

exports.getAllBooks = catchAsync(async (req, res, next) => {
    // Execute a query
    const features = new BooksFeatures(Book.find(), req.query)
    .filter()
    .sort()
    .displayFields()
    .paginate();

    const books = await features.query;

    // Send a response
    res.status(200).json({
        status: 'Success',
        result: books.length,
        data: {
            books
        }
    });
});

exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new AppError(`No book with id: ${req.params.id} was found.`, 404));
    };

    res.status(200).json({
        status: 'Success',
        data: {
            book
        }
    });
});

exports.addBook = (req, res, next) => {
    res.status(201).json({ message: 'New book added', app: "booksreview"});
};

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!book) {
        return next(new AppError(`No book with id: ${req.params.id} was found.`, 404));
    };

    res.status(200).json({
        status: 'Success',
        data: {
            book
        }
    });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
        return next(new AppError(`No book with id: ${req.params.id} was found.`, 404));
    };

    res.status(204).json({
        status: 'Success',
        data: null
    });
});

exports.getBooksStats = catchAsync(async (req, res, next) => {
    const stats = await Book.aggregate([
        {
            $match: { year: { $gte: 2015 } }
        },
        {
            $group: {
                _id: '$year',
                numBooks: { sum: 1 }
            }
        },
        {
            $sort: { numBooks: 1 }
        }
    ]);
    res.status(200).json({
        status: 'Success',
        data: {
            stats
        }
    });
});