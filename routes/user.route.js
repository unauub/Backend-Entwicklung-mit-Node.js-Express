const express = require('express');

const {
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
  addUser,
} = require('../controllers/user.controller');
const authController = require('./../controllers/auth.controller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Users Routes
router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
