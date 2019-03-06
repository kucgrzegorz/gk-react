const express = require('express');
const router = express.Router();
const Arcade = require('../models/arcade');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controlers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
	res.json({"secret": true});
});

router.get('/manage', UserCtrl.authMiddleware, function(req,res) {
	const user = res.locals.user;

	Arcade
	.where({user})
	.populate('bookings')
	.exec(function(err, foundArcades){

		if (err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		return res.json(foundArcades);
	});
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

router.delete('/:id', UserCtrl.authMiddleware, function(req, res) {
	const user = res.locals.user;

	Arcade
	.findById(req.params.id)
	.populate('user', '_id')
	.populate({
		path: 'bookings',
		select: 'startAt',
		match: { startAt: { $gt: new Date()}}
	})
	.exec(function(err, foundArcade) {

		if (err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if (user.id !== foundArcade.user.id) {
			return res.status(422).send({errors: [{title: 'Nieprawidłowy użytkownik!', detail: 'Nie jesteś właścicielem salonu!'}]});
		}

		if (foundArcade.bookings.length > 0) {
			return res.status(422).send({errors: [{title: 'Rezerwacje w tym obiekcie są aktywne!', detail: 'Nie można usunąć salonu z aktywnymi rezerwacjami!'}]});
		}

		foundArcade.remove(function(err) {
			if (err) {
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			return res.json({'status': 'deleted'});
		});
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