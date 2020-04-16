const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');
const sendEmail = require('./../utilities/nodemail')

const signToken = id => {
    jwt.sign(
        { id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }
    );
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 3600000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    };

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'Success',
        token,
        data: user
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    // Signing json web token: takes a payload, secret
    createSendToken(newUser, 201, res);
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
    createSendToken(user, 200, res);
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

    // Generate password reset token url
    const resetLink = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;

    // Generic message
    const message = `Forgot password? Please submit new password to: ${resetLink}.\nIf you didn't initiate this process, please ignore this message.`;

    try {
        // Send token to user as email
        await sendEmail({
            email: req.body.email,
            subject: 'Your password reset token expires in 10 minutes',
            message
        });

    res.status(200).json({
        status: 'Success',
        message: 'Password reset token sent to email'
    });
        
    } catch (error) {
        // Update reset properties
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        // Save changes
        await user.save({ validateBeforeSave: false });

        // Return error message
        return next(new AppError('There was an error sending sending password reset token. Please try later!', 500));
    }

});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // Hash the unenscripted password reset token
    const hashedResetToken = crypto
        .createHash(sha256)
        .update(req.params.token)
        .digest('hex');
    
    // Get user based on the valid hashed password reset token
    const user = await User.findOne({
        passwordResetToken: hashedResetToken,
        passwordResetExpires: {
            $gt: Date.now
        }
    });
    
    // Check if there is a user
    if (!user) {
        return next(new AppError('The password reset token is invalid or has expired!', 400));
    };

    // Get modified user details
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    // Delete password reset properties
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save changes to DB
    await user.save();

    // Log the user in
    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // Get the user from DB
    const user = await User.findById(req.user.id).select('+password');

    // Verify current password
    if (!(await user.checkPassword(req.body.currentPassword, user.password))) {
        return next(
            new AppError('Your current password is incorrect!', 401)
        );
    };

    // Update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    await user.save();

    // Log user in
    createSendToken(user, 200, res);
});