const User = require('./../models/userModel');
const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');
const handlerFactory = require('./handlerFactory');

const filterBody = (bodyObj, ...allowedFields) => {
    const newObj = {};

    Object.keys(bodyObj).forEach(el => {
        if (allowedFields.includes(el)) {
            newObj[el] = bodyObj[el];
        };
    });

    return newObj;
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;

    next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
    // Prevent password update
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError('You cannot update password here!!', 400)
        );
    };

    // Update user data
    const filteredBody = filterBody(req.body, 'name', 'email');

    const currentUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'Success',
        data: {
            user: currentUser
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'Success',
        Data: null
    })
})

// Get all users
exports.getAllUsers = handlerFactory.getAllDocs(User);

// Get a user
exports.getUser = handlerFactory.getDoc(User);

// Update a user
exports.updateUser = handlerFactory.updateDoc(User);

// Delete a user
exports.deleteUser = handlerFactory.deleteDoc(User);