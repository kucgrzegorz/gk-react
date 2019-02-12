const express = require('express');
const mongoose = require('mongoose');
const FakeDb = require('./fake-db');

const arcadeRoutes = require('./routes/arcades');

mongoose.connect('mongodb+srv://Test00:test99@gk-react-dev-gytq3.mongodb.net/test?retryWrites=true', { useNewUrlParser: true}).then(() => {
	const fakeDb = new FakeDb();
	fakeDb.seedDb();
});

const app = express();

app.use('/api/v1/arcades', arcadeRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
	console.log('I am running!');
});