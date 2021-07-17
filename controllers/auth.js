const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc      Register user
// @route     POST /auth/register
// @access    Public
const register = async (req, res, next) => {
    const { username,  password } = req.body;

    // Create user
    const user = await User.create({
        username,
        password,
    });

    sendTokenResponse(user, 200, res);
};

// @desc      Login user
// @route     POST /auth/login
// @access    Public
const login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ErrorResponse('Please provide an username and password', 400));
    }

    // Check for user
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
};

module.exports = { register, login }
