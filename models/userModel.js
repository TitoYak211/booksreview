const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "First name is required"]
    },
    lname: {
        type: String,
        required: [true, "Last name is required"]
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
        required: [true, "Password is required"]
    },
    passwordConfirm: {
        type: Number,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            }
        }
    },
    photo: String
  });
  
userSchema.pre('save', async function (next) {
    // Check if password is modified
    if (!this.isModified('password')) return next();

    // Encripting user password with a cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete confirmed password field
    this.passwordConfirm = undefined;

    next();
});

const User = mongoose.model("User", userSchema);
  
module.exports = User;