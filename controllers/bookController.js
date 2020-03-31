const Book = require('./../models/bookModel');

// Routes handlers
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
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

exports.getBook = (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Get a book by id', app: "booksreview"});
};

exports.addBook = (req, res) => {
    res.status(201).json({ message: 'New book added', app: "booksreview"});
};

exports.updateBook = (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Update a book given id', app: "booksreview"});
};

exports.deleteBook = (req, res) => {
    const id = req.params.id * 1;
    res.status(204).json({ message: 'Delete a book given id', app: "booksreview"});
};