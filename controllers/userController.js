const User = require('./../models/userModel');
const catchAsync = require('./../utilities/catchAsync');

// Routes handlers
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    // Send a response
    res.status(200).json({
        status: 'Success',
        result: users.length,
        data: {
            users
        }
    });
});

exports.getUser = (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Get a user by id', app: "booksreview"});
};

exports.updateUser = (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({ message: 'Update a user given an id', app: "booksreview"});
};

exports.deleteUser = (req, res) => {
    const id = req.params.id * 1;
    res.status(204).json({ message: 'Delete a user given an id', app: "booksreview"});
};
