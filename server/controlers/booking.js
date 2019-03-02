const Booking = require('../models/booking');
const Arcade = require('../models/arcade');
const { normalizeErrors } = require('../helpers/mongoose');

exports.createBooking = function(req, res) {
	const { startAt, endAt, totalPrice, guests, days, arcade } = req.body;
	const user = res.locals.user;

	const booking = new Booking({ startAt, endAt, totalPrice, guests, days});

	Arcade.findById(arcade._id)
		.populate('bookings')
		.populate('user')
		.exec(function(err, foundArcade) {

		if (err) {
 			return res.status(422).send(err);
		}

		if (foundArcade.user.id === user.id) {
			return res.status(422).send({errors: [{title: 'Invalid user!', detail: 'You cannot create a booking on your own Arcade!'}]});
		}

		return res.json({booking, foundArcade});
	})
	}