const express = require('express');
const router = express.Router();
const Arcade = require('../models/arcade');

router.get('', function(req, res) {
	Arcade.find({}, function(err, foundArcades) {

		res.json(foundArcades);
	});
});

router.get('/:id', function(req, res) {
	const arcadeId = req.params.id;

	Arcade.findById(arcadeId, function(err, foundArcade) {
		if (err) {

			res.status(422).send({errors: [{title: 'Arcade Error!', detail: 'Could not find Arcade!'}]});
		}

		res.json(foundArcade);
	});
});

module.exports = router;