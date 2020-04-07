const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');

const signToken = id => {
    jwt.sign(
        { id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }
    );
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    // Signing json web token: takes a payload, secret
    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'Success',
        token,
        data: newUser
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check for email, password
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    };

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    };

    // Send token to client
    const token = signToken(user._id);

    res.status(200).json({
        status: 'Success',
        token
    });
});

exports.protectRoutes = catchAsync(async (req, res, next) => {
    // Check for token
    let token;

    if (req.headers.authorization && req.headers.authorization.startWith('Bear')) {
        token = req.headers.authorization.split(' ')[1];
    };

    if (!token) {
        return next(new AppError('Oops, you are not loginned for access!!', 401));
    };

    // Validate the token
    const decodedPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decodedPayload.id);

    if (!currentUser) {
        return next(new AppError('The user for this token no longer exists!!', 401));
    };

    // Check if user changed password after token issued
    if (currentUser.passwordChangedAfter(decodedPayload.iat)) {
        return next(new AppError('Password was recently changed. Please log in again!', 401));
    };

    // Grant access to protected routes
    req.user = currentUser;

    next();
});

exports.restrictRole = (...userTypes) => {
    return (req, res, next) => {
        if (!userTypes.includes(req.user.userType)) {
            return next(new AppError('Oops! You do not have permission to perform this action', 403));
        };
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // Get user by email
    const user = await User.findOne({ email: req.body.email });

    // Verify the queried user
    if (!user) {
        return next(new AppError(`A user with email: ${req.body.email} does not exist`, 404));
    };

    // Generate random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send token to user as email

});

exports.resetPassword = (req, res, next) => {

};