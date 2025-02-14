const User = require('./../models/user.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'Success',
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'error, y Sahbi 💥',
    });
  }
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const addUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

module.exports = { getAllUsers, updateUser, getUser, deleteUser, addUser };
