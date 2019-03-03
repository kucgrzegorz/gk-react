const express = require('express');
const router = express.Router();
const Arcade = require('../models/arcade');

const UserCtrl = require('../controlers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
	res.json({"secret": true});
});

router.get('', function(req, res) {
	Arcade.find({})
		.select('-bookings')
		.exec(function(err, foundArcades) {

		res.json(foundArcades);
	});
});

router.get('/:id', function(req, res) {
	const arcadeId = req.params.id;

	Arcade.findById(arcadeId)
		.populate('user', 'username -_id')
		.populate('bookings', 'startAt endAt -_id')
		.exec(function(err, foundArcade) {
		
			if (err) {
				return res.status(422).send({errors: [{title: 'Arcade Error!', detail: 'Could not find Arcade!'}]});
		}

		return res.json(foundArcade);
	});
});

module.exports = router;