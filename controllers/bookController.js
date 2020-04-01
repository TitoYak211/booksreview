const Book = require('./../models/bookModel');

// Routes handlers
class BooksFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    };

    filter() {
        // Buid a filter query
        const queryObj = { ...this.queryString };
        const removedFields = ['page', 'sort', 'limit', 'fields'];
        removedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    };

    sort() {
        // Sorting books based on query object
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-year');
        };

        return this;
    };

    displayFields() {
        // Fields limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        };

        return this;
    };

    paginate() {
        // PAGINATION: Default page is 1
        const page = this.queryString.page * 1 || 1;

        // Default number of books per page = 100
        const limit = this.queryString.limit * 1 || 100;

        // Number of books to skip for the requested page
        const skipValue = (page - 1) * limit;

        this.query = this.query.skip(skipValue).limit(limit);

        return this;
    };
};

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