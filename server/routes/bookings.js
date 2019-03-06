const express = require('express');
const router = express.Router();

const UserCtrl = require('../controlers/user');
const BookingCtrl = require('../controlers/booking');

router.post('', UserCtrl.authMiddleware, BookingCtrl.createBooking);

router.get('/manage', UserCtrl.authMiddleware, BookingCtrl.getUserBookings);

module.exports = router;