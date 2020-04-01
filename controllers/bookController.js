const Book = require('./../models/bookModel');

// Routes handlers
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
        // buid a filter query
        const queryObj = { ...req.query };
        const removedFields = ['page', 'sort', 'limit', 'fields'];
        removedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Book.find(JSON.parse(queryStr));

        // Sorting books based on query object
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-year');
        };

        // Fields limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        };

        // PAGINATION: Default page is 1
        const page = req.query.page * 1 || 1;

        // Default number of books per page = 100
        const limit = req.query.limit * 1 || 100;

        // Number of books to skip for the requested page
        const skipValue = (page - 1) * limit;

        query = query.skip(skipValue).limit(limit);

        if (req.query.page) {
            // Count number of books in the DB
            const numBooks = await Book.countDocuments();
            
            // check if the requested page has books
            if (skipValue >= numBooks) {
                throw new ERROR ('This page does not exist');
            };
        };

        // execute a query
        const books = await query;

        // send a response
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
            new: true
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