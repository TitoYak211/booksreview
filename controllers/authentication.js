const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    // Signing json web token: takes a payload, secret
    const token = jwt.sign(
        {
            id: newUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN
        }
    );

    res.status(201).json({
        status: 'Success',
        token,
        data: newUser
    });
});

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    // Check for email, password
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    };

    // Check if user exists
    const user = User.findOne({ email });
    
    // Send token to client
    const token = '';

    res.status(200).json({
        status: 'Success',
        token
    });
}