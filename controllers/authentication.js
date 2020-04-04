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

    res.status(201).json({
        status: 'Success',
        data: newUser
    });
});