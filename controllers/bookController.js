const Book = require('./../models/bookModel');
const BooksFeatures = require('./../utilities/features');

// ROUTES HANDLERS
exports.popularBooks = async (req, res, next) => {
    try {
        req.query.limit = 10;
        req.query.fields = 'author,title,year'
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    };
    next();
};

exports.getAllBooks = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: {
                book
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.addBook = (req, res) => {
    res.status(201).json({ message: 'New book added', app: "booksreview"});
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'Success',
            data: {
                book
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'Success',
            data: null
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};

exports.getBooksStats = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};