const express = require('express');
const router = express.Router();
const Arcade = require('../models/arcade');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controlers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
	res.json({"secret": true});
});

router.get('/:id', function(req, res) {
	const arcadeId = req.params.id;

	Arcade.findById(arcadeId)
		.populate('user', 'username -_id')
		.populate('bookings', 'startAt endAt -_id')
		.exec(function(err, foundArcade) {
		
			if (err) {
				return res.status(422).send({errors: [{title: 'Błąd!', detail: 'Nie znaleziono salonu!'}]});
		}

		return res.json(foundArcade);
	});
});

router.post('', UserCtrl.authMiddleware, function(req, res) {
	const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
	const user = res.locals.user;

	const arcade = new Arcade({title, city, street, category, image, shared, bedrooms, description, dailyRate});
	arcade.user = user;

	Arcade.create(arcade, function(err, newArcade) {
	if (err) {
		return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		User.update({_id: user.id}, { $push: {arcades: newArcade}}, function(){});

		return res.json(newArcade);
	});
});

router.get('',  function(req, res) {
	const city = req.query.city;
	const query = city ? ({city: city.toLowerCase()}) : {};

		Arcade.find(query)
			.select('-bookings')
			.exec(function(err, foundArcades) {

	if (err) {
		return res.status(422).send({errors: normalizeErrors(err.errors)}); //mongoose errror
	}

	if (city && foundArcades.length === 0) {
		return res.status(422).send({errors: [{title: 'Nie znaleziono salonów!', detail: `Nie ma salonów dla miasta ${city}`}]});
	}
			return res.json(foundArcades);
		});
});

module.exports = router;