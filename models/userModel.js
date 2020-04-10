const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            }
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    userType: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member'
    },
    photo: String
  });
  
userSchema.pre('save', async function (next) {
    // Check if password is modified
    if (!this.isModified('password')) {
        return next();
    };

    // Encripting user password with a cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete confirmed password field
    this.passwordConfirm = undefined;

    next();
});

userSchema.pre('save', async function (next) {
    // Check if password is modified
    if (!this.isModified('password') || this.isNew) {
        return next();
    };

    // Update passwordChangedAt
    this.passwordChangedAt = Date.now();

    next();
});

userSchema.pre(/^find/, function (next) {
    // Return active members only
    this.find({ active: { $ne: false } });

    next();
});

userSchema.methods.checkPassword = async (userPassword, dbPassword) => {
    return await bcrypt.compare(userPassword, dbPassword);
};

userSchema.methods.passwordChangedAfter = async (JWTTimestamp) => {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestamp < changedTimestamp;
    };

    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    // Generate a random reset-token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Encrypt set-token
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Restrict token validity
    this.passwordResetExpires = Date.now() + 600000;

    return resetToken;
};

const User = mongoose.model("User", userSchema);
  
module.exports = User;