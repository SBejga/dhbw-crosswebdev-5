var express = require('express');
var app = express();

// ### Server Config
var port = process.env.PORT || 3000; //use 3000 or environment var

// ### Express Config
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// ### Routes
// route /users
var usersRoute = require('./routes/users.js');
app.use('/users', usersRoute);

// public route for static files (frontend)
app.use(express.static('public'));

// ### MongoDB Connection before startup
var mongoose = require('mongoose');
var config = require('./config.json');
mongoose.connect(config.mongo_uri, function (err) {
	if (err) {
		console.log('======================================================================================');
		console.log('Error: ');
		console.log('Could not establish connection to mongodb.');
		console.log('Check if mongodb is running and config.json');
		console.log('===================================================================================');
		process.exit(1);
	}
});

// ### Startup
app.listen(port, function (err) {
	if (err) {
		console.error("express server failed: ", err);
	}

	console.log("express server started at :" + port);

});

//export express app for tests etc.
module.exports = app;