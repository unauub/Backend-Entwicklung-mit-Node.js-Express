const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser },
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Checki if email nd pswd exist
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide email and password' });
    }

    // Check if user exists &&  pswd is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json({ message: 'Please provide a correct email or password' });
    }

    //if everything ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1. Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: 'You are not logged in! Pleae log in to get access' });
    }

    // 2. Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    // 4. Check if user changed password after the token was issued
    if (currentUser.chengedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        message: 'The user Changed his password, Log in Again.',
      });
    }

    // Grant Access to Protected Route
    req.user = currentUser;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token! Please log in again.',
    });
  }
};
