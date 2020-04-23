const multer = require('multer');

const User = require('./../models/userModel');
const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');
const handlerFactory = require('./handlerFactory');

// File storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        // Get file extension
        const ext = file.mimetype.split('/')[1];

        // Save images as:
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
})

// Check if the file is an image
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('This is not an image. Please upload image files only!!', 400), false)
    }
}

// File upload for user photos
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

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