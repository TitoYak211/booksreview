const Book = require('./../models/bookModel');

// Routes handlers
exports.getAllBooks = async (req, res) => {
    try {
        // buid a query
        const queryObj = { ...req.query };
        const removedFields = ['page', 'sort', 'limit', 'fields'];
        removedFields.forEach(el => delete queryObj[el]);

        const query = Book.find(queryObj);

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