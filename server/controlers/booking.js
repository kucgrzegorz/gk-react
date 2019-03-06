const Booking = require('../models/booking');
const Arcade = require('../models/arcade');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

exports.createBooking = function(req, res) {
	const { startAt, endAt, totalPrice, guests, days, arcade } = req.body;
	const user = res.locals.user;

	const booking = new Booking({ startAt, endAt, totalPrice, guests, days});

	Arcade.findById(arcade._id)
		.populate('bookings')
		.populate('user')
		.exec(function(err, foundArcade) {

		if (err) {
 			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if (foundArcade.user.id === user.id) {
			return res.status(422).send({errors: [{title: 'Nieprawidłowy użytkownik!', detail: 'Nie możesz stworzyć rezerwacji w swoim Salonie!'}]});
		}

		if (isValidBooking(booking, foundArcade)) {
			booking.user = user;
			booking.arcade = foundArcade;
			foundArcade.bookings.push(booking);

			booking.save(function(err) {
				if (err) {
 					return res.status(422).send({errors: normalizeErrors(err.errors)});
				}

				foundArcade.save()
				User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});

				return res.json({startAt: booking.startAt, endAt: booking.endAt});
			});
		} else {

	return res.status(422).send({errors: [{title: 'Nieprawidłowa rezerwacja!', detail: 'Wybrane daty są już zajęte!'}]});
		
		}
	})
}

exports.getUserBookings = function(req,res) {
	const user = res.locals.user;

	Booking
	.where({user})
	.populate('arcade')
	.exec(function(err, foundBookings){

		if (err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		return res.json(foundBookings);
	});
}

	function isValidBooking(proposedBooking, arcade) {
		let isValid = true;

		if (arcade.bookings && arcade.bookings.length > 0) {

			isValid = arcade.bookings.every(function(booking) {
				const proposedStart = moment(proposedBooking.startAt);
				const proposedEnd = moment(proposedBooking.endAt);

				const actualStart = moment(booking.startAt);
				const actualEnd = moment(booking.endAt);

				return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
			
		});
	}

	return isValid;
}