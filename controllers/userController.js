const User = require('./../models/userModel');
const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');

const filterBody = (bodyObj, ...allowedFileds) => {
    const newObj = {};

    Object.keys(bodyObj).forEach(el => {
        if (allowedFileds.includes(el)) {
            newObj[el] = bodyObj[el];
        };

        return newObj;
    });
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
    // Prevent password update
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError('You cannot update password here!!', 400)
        );
    };

    // Update user data
    const filteredBody = filterBody(rq.body, 'firstName', 'lastName', 'email');

    const currentUser = User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).JSON({
        status: 'Success',
        data: {
            user: currentUser
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
