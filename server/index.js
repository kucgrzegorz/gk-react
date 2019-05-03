const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const FakeDb = require('./fake-db');
const path = require('path');

mongoose.connect('mongodb+srv://Test00:test99@gk-react-dev-gytq3.mongodb.net/test?retryWrites=true', { useNewUrlParser: true}).then(() => {
	if (process.env.NODE_ENV !== 'production') {
		const fakeDb = new FakeDb();
		//fakeDb.seedDb();
	}
});

require('./models/user')
require('./models/arcade')
require('./models/booking')

const arcadeRoutes = require('./routes/arcades'),
	 userRoutes = require('./routes/users'),
	 bookingRoutes = require('./routes/bookings');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/arcades', arcadeRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);


	if (process.env.NODE_ENV === 'production') {
		const appPath = path.join(__dirname, '..', 'build');
		app.use(express.static(appPath));

		app.get('*', function(req, res) {
			res.sendFile(path.resolve(appPath, 'index.html'));
		});
	}
	




const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
	console.log('I am running!');
});