const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const FakeDb = require('./fake-db');

mongoose.connect('mongodb+srv://Test00:test99@gk-react-dev-gytq3.mongodb.net/test?retryWrites=true', { useNewUrlParser: true}).then(() => {
	const fakeDb = new FakeDb();
	// fakeDb.seedDb();
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
	console.log('I am running!');
});