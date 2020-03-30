// Routes handlers
exports.getAllBooks = (req, res) => {
    res.status(200).json({ message: 'These are all books', app: "booksreview" });
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