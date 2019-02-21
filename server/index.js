const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const FakeDb = require('./fake-db');
const Arcade = require('./models/arcade')

const arcadeRoutes = require('./routes/arcades'),
	 userRoutes = require('./routes/users');

mongoose.connect('mongodb+srv://Test00:test99@gk-react-dev-gytq3.mongodb.net/test?retryWrites=true', { useNewUrlParser: true}).then(() => {
	const fakeDb = new FakeDb();
	fakeDb.seedDb();
});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/arcades', arcadeRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
	console.log('I am running!');
});