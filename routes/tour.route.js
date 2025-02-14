const express = require('express');
const authController = require('./../controllers/auth.controller');
const {
  getAllTour,
  getTour,
  addTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
} = require('../controllers/tour.controller');

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTour);

router.route('/tour-stats').get(getTourStats);

router.route('/').get(authController.protect, getAllTour).post(addTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
