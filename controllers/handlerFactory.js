const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/AppError');

exports.deleteDoc = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateDoc = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError(`No document with id: ${req.params.id} was found.`, 404));
    };

    res.status(200).json({
        status: 'Success',
        data: {
            data: doc
        }
    });
});

exports.createDoc = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).JSON({
        status: 'Success',
        data: {
            data: doc
        }
    });
});

exports.getDoc = (Model, populateOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
        query = query.populate(populateOptions);
    };

    const doc = await query;

    if (!doc) {
        return next(new AppError(`No document with id: ${req.params.id} was found.`, 404));
    };

    res.status(200).json({
        status: 'Success',
        data: {
            data: doc
        }
    });
});