const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth = function(req, res) {
	const { email, password } = req.body;

if (!password || !email) {
		return res.status(422).send({errors: [{title: 'Brak danych!', detail: 'Wpisz email i hasło!'}]});
	}

	User.findOne({email}, function(err, user) {
		if (err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if (!user) {
			return res.status(422).send({errors: [{title: 'Niepoprawny użytkownik!', detail: 'Użytkownik nie istnieje!'}]});
		}

		if (user.hasSamePassword(password)) {
			const token = jwt.sign({
			userId: user.id,
			username: user.username
			}, config.SECRET, { expiresIn: '1h' });

			return res.json(token);
			} else {
			return res.status(422).send({errors: [{title: 'Niepoprawne dane!', detail: 'Nieprawidłowy email lub hasło!'}]});
		}
	});
}

exports.register = function(req, res) {
	const { username, email, password, passwordConfirmation } = req.body;

	if (!password || !email) {
		return res.status(422).send({errors: [{title: 'Brak danych!', detail: 'Wpisz email i hasło!'}]});
	}

	if (password !== passwordConfirmation) {
		return res.status(422).send({errors: [{title: 'Niepoprawne hasło!', detail: 'Hasło nie jest zgodne z potwierdzonym hasłem!'}]});
	}

	User.findOne({email}, function(err, existingUser) {
		if (err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if (existingUser) {
			return res.status(422).send({errors: [{title: 'Niepoprawny email!', detail: 'Użytkownik z takim adresem email już istnieje!'}]});
		}
		const user = new User({
			username,
			email,
			password
		});

		user.save(function(err) {
			if (err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			return res.json({'register': true});
		})
	})
}

	exports.authMiddleware = function(req, res, next) {
		const token = req.headers.authorization;

		if (token) {
			const user = parseToken(token);
			
			User.findById(user.userId, function(err, user) {
			if (err) {
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			if (user) {
				res.locals.user = user;
				next();
			} else { 

				return notAuthorized(res);
			}
		})

		} else {
			return notAuthorized(res);
		}
	}

	function parseToken(token) {
		 return jwt.verify(token.split(' ')[1], config.SECRET);
	}

	function notAuthorized(res) {
		return res.status(401).send({errors: [{title: 'Nieautoryzowany', detail: 'UWymagane jest zalogowanie, aby uzyskać dostęp'}]});		
	}