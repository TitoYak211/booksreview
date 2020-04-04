const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utilities/catchAsync');

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