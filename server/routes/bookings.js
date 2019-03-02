const express = require('express');
const router = express.Router();

const UserCtrl = require('../controlers/user');
const BookingCtrl = require('../controlers/booking');

router.post('', UserCtrl.authMiddleware, BookingCtrl.createBooking);

module.exports = router;